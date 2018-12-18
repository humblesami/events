import os
import sys

import numpy as np
import pytesseract as pytesseract
from PIL import Image

module_pth = "/".join(__file__.split("/")[:-2])
sys.path.append(module_pth + "/src")
import argparse
import cv2
import editdistance
from DataLoader import DataLoader, Batch
from Model import Model, DecoderType
from SamplePreprocessor import preprocess
from WordSegmentation import wordSegmentation, prepareImg,createKernel


class FilePaths:
	"filenames and paths to data"
	fnCharList = module_pth +'/model/charList.txt'

	fnAccuracy = module_pth +'/model/accuracy.txt'
	fnTrain = module_pth +'/data/'
	fnInfer = 'hs.png'
	fnCorpus = module_pth + '/data/corpus.txt'


def train(model, loader):
	"train NN"
	epoch = 0 # number of training epochs since start
	bestCharErrorRate = float('inf') # best valdiation character error rate
	noImprovementSince = 0 # number of epochs no improvement of character error rate occured
	earlyStopping = 5 # stop training after this number of epochs without improvement
	while True:
		epoch += 1
		print('Epoch:', epoch)

		# train
		print('Train NN')
		loader.trainSet()
		while loader.hasNext():
			iterInfo = loader.getIteratorInfo()
			batch = loader.getNext()
			loss = model.trainBatch(batch)
			print('Batch:', iterInfo[0],'/', iterInfo[1], 'Loss:', loss)

		# validate
		charErrorRate = validate(model, loader)

		# if best validation accuracy so far, save model parameters
		if charErrorRate < bestCharErrorRate:
			print('Character error rate improved, save model')
			bestCharErrorRate = charErrorRate
			noImprovementSince = 0
			model.save()
			open(FilePaths.fnAccuracy, 'w').write('Validation character error rate of saved model: %f%%' % (charErrorRate*100.0))
		else:
			print('Character error rate not improved')
			noImprovementSince += 1

		# stop training if no more improvement in the last x epochs
		if noImprovementSince >= earlyStopping:
			print('No more improvement since %d epochs. Training stopped.' % earlyStopping)
			break


def validate(model, loader):
	"validate NN"
	print('Validate NN')
	loader.validationSet()
	numCharErr = 0
	numCharTotal = 0
	numWordOK = 0
	numWordTotal = 0
	while loader.hasNext():
		iterInfo = loader.getIteratorInfo()
		print('Batch:', iterInfo[0],'/', iterInfo[1])
		batch = loader.getNext()
		recognized = model.inferBatch(batch)

		print('Ground truth -> Recognized')
		for i in range(len(recognized)):
			numWordOK += 1 if batch.gtTexts[i] == recognized[i] else 0
			numWordTotal += 1
			dist = editdistance.eval(recognized[i], batch.gtTexts[i])
			numCharErr += dist
			numCharTotal += len(batch.gtTexts[i])
			print('[OK]' if dist==0 else '[ERR:%d]' % dist,'"' + batch.gtTexts[i] + '"', '->', '"' + recognized[i] + '"')

	# print validation result
	charErrorRate = numCharErr / numCharTotal
	wordAccuracy = numWordOK / numWordTotal
	print('Character error rate: %f%%. Word accuracy: %f%%.' % (charErrorRate*100.0, wordAccuracy*100.0))
	return charErrorRate


def infer(model, fnImg):
	"recognize text in image provided by file path"
	img = preprocess(cv2.imread(fnImg, cv2.IMREAD_GRAYSCALE), Model.imgSize)
	batch = Batch(None, [img] * Model.batchSize) # fill all batch elements with same input image
	recognized = model.inferBatch(batch) # recognize text
	print('Recognized:', '"' + recognized[0] + '"') # all batch elements hold same result


def main():
	"main function"
	# optional command line args
	parser = argparse.ArgumentParser()
	parser.add_argument("--train", help="train the NN", action="store_true")
	parser.add_argument("--validate", help="validate the NN", action="store_true")
	parser.add_argument("--beamsearch", help="use beam search instead of best path decoding", action="store_true")
	parser.add_argument("--wordbeamsearch", help="use word beam search instead of best path decoding", action="store_true")
	args = parser.parse_args()

	decoderType = DecoderType.BestPath
	if args.beamsearch:
		decoderType = DecoderType.BeamSearch
	elif args.wordbeamsearch:
		decoderType = DecoderType.WordBeamSearch

	# train or validate on IAM dataset
	if args.train or args.validate:
		# load training data, create TF model
		loader = DataLoader(FilePaths.fnTrain, Model.batchSize, Model.imgSize, Model.maxTextLen)

		# save characters of model for inference mode
		open(FilePaths.fnCharList, 'w').write(str().join(loader.charList))

		# save words contained in dataset into file
		open(FilePaths.fnCorpus, 'w').write(str(' ').join(loader.trainWords + loader.validationWords))

		# execute training or validation
		if args.train:
			model = Model(loader.charList, decoderType)
			train(model, loader)
		elif args.validate:
			model = Model(loader.charList, decoderType, mustRestore=True)
			validate(model, loader)

	# infer text on test image
	else:
		print(open(FilePaths.fnAccuracy).read())
		model = Model(open(FilePaths.fnCharList).read(), decoderType, mustRestore=True)
		infer(model, FilePaths.fnInfer)




def main2():
	# import image
	os.system(module_pth + '/src/textcleaner -g -e stretch -f 25 -o 10 -s 1 7.jpg result1.png')

	image = cv2.imread('result1.png')
	# cv2.imshow('orig',image)
	# cv2.waitKey(0)

	# grayscale
	gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
	# cv2.imshow('gray', gray)
	# cv2.waitKey(0)

	# binary
	ret, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY_INV)
	# ret, thresh = cv2.threshold(gray, 0, 255,cv2.THRESH_BINARY | cv2.THRESH_OTSU)
	# cv2.imshow('second', thresh)
	# cv2.waitKey(0)

	# dilation
	kernel = np.ones((5, 500), np.uint8)
	# kernel = createKernel(25, 11, 7)
	img_dilation = cv2.dilate(thresh, kernel, iterations=1)
	# cv2.imshow('dilated', img_dilation)
	# cv2.waitKey(0)

	# find contours
	im2, ctrs, hier = cv2.findContours(img_dilation.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

	# sort contours
	sorted_ctrs = sorted(ctrs, key=lambda ctr: (cv2.boundingRect(ctr)[1]))
	words = []
	for i, ctr in enumerate(sorted_ctrs):
		# Get bounding box
		x, y, w, h = cv2.boundingRect(ctr)

		# Getting ROI-
		roi = image[y:y + h, x:x + w]
		line_img = prepareImg(roi, 50)
		# cv2.imwrite('../out/%d.png' % (i), roi)  # save word
		res = []
		res = wordSegmentation(line_img, kernelSize=25, sigma=11, theta=7, minArea=100)
		# for (j, w) in enumerate(res):
		# 	(wordBox, wordImg) = w
		# 	(x, y, w, h) = wordBox
		#
		# 	cv2.rectangle(line_img,(x,y),(x+w,y+h),0,1) # draw bounding box in summary image
		# 	cv2.imwrite('../out/lines/%d.png' % (i), line_img)  # save word
		# cv2.rectangle(image, (x, y), (x + w, y + h), (90, 0, 255), 2)

		words = words + res

	# show ROI
	# cv2.imshow('segment no:' + str(i), roi)

	# cv2.waitKey(0)
	cv2.imshow('marked areas', image)
	cv2.waitKey(0)

	decoderType = DecoderType.BestPath
	model = Model(open(FilePaths.fnCharList).read(), decoderType, mustRestore=True)
	for (j, w) in enumerate(words):
		(wordBox, wordImg) = w
		# cv2.imwrite('../out/%d.png' % (j), wordImg)  # save word

		img = preprocess(wordImg, Model.imgSize)
		batch = Batch(None, [img] * Model.batchSize)  # fill all batch elements with same input image
		recognized = model.inferBatch(batch)  # recognize text
		if recognized[0]==".":
			continue
		print(recognized[0])  # all batch elements hold same result







def main1():
	os.system(module_pth+'/src/textcleaner -g -e stretch -f 25 -o 10 -s 1 91.jpg result1.png')

	image = cv2.imread('result1.png')
	# cv2.imshow('orig',image)
	# cv2.waitKey(0)

	# grayscale
	gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
	# cv2.imshow('gray', gray)
	# cv2.waitKey(0)
	# prtions
	# binary
	ret, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY_INV)
	# cv2.imshow('second', thresh)0
	# cv2.waitKey(0)

	# dilation
	kernel = createKernel(25, 11, 7)
	img_dilation = cv2.dilate(thresh, kernel, iterations=1)
	# cv2.imshow('dilated', img_dilation)
	# cv2.waitKey(0)

	# find contours
	im2, ctrs, hier = cv2.findContours(img_dilation.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

	# for the_file in os.listdir('../out/'):
	# 	file_path = os.path.join('../out/', the_file)
	# 	try:
	# 		if os.path.isfile(file_path):
	# 			os.unlink(file_path)
	# 	# elif os.path.isdir(file_path): shutil.rmtree(file_path)
	# 	except Exception as e:
	# 		print(e)
	# sort contours
	sorted_ctrs = sorted(ctrs, key=lambda ctr: (cv2.boundingRect(ctr)[1], cv2.boundingRect(ctr)[0]))
	words = []
	first = sorted_ctrs[0]
	words.append(first)
	y1 = cv2.boundingRect(first)[1]
	h1 = cv2.boundingRect(first)[3]
	bottom = y1 + h1
	sorted_ctrs.pop(0)
	line = []
	for wrd in sorted_ctrs:
		x, y, w, h = cv2.boundingRect(wrd)
		if y > bottom:
			line = sorted(line, key=lambda ctr: (cv2.boundingRect(ctr)[0]))
			words = words + line
			bottom = y + h
			line = []
			line.append(wrd)
		else:
			line.append(wrd)
	if line:
		line = sorted(line, key=lambda ctr: (cv2.boundingRect(ctr)[0]))
		words = words + line
	decoderType = DecoderType.BestPath
	# decoderType = DecoderType.BeamSearch
	# decoderType = DecoderType.WordBeamSearch
	model = Model(open(FilePaths.fnCharList).read(), decoderType, mustRestore=True)
	for i, ctr in enumerate(words):
		if cv2.contourArea(ctr) < 100:
			continue
		# Get bounding box
		x, y, w, h = cv2.boundingRect(ctr)
		# Getting ROI-
		roi = image[y:y + h, x:x + w]
		line_img=roi[:, :, 0]
		# line_img = prepareImg(line_img, 50)
		# cv2.imwrite('../out/%d.png' % (i), roi)  # save word
		# cv2.rectangle(image, (x, y), (x + w, y + h), (90, 0, 255), 2)
		img = preprocess(line_img, Model.imgSize)
		batch = Batch(None, [img] * Model.batchSize)  # fill all batch elements with same input image
		recognized = model.inferBatch(batch)  # recognize text
		# print('Recognized:', '"' + recognized[0] + '"')
		print(recognized[0])
	cv2.imshow('orig', image)
	cv2.waitKey(0)

def ocr():
	text = pytesseract.image_to_string(Image.open('aa1.jpg'))
	print(text)



	# decoderType = DecoderType.BestPath
	# model = Model(open(FilePaths.fnCharList).read(), decoderType, mustRestore=True)
	# imgFiles = os.listdir('../out/')
	# imgFiles = sorted(imgFiles, key=lambda x: float(x.split(".")[0]))
	# for (i, f) in enumerate(imgFiles):
	# 	img = preprocess(cv2.imread('../out/%s' % (f), cv2.IMREAD_GRAYSCALE), Model.imgSize)
	# 	batch = Batch(None, [img] * Model.batchSize)  # fill all batch elements with same input image
	# 	recognized = model.inferBatch(batch)  # recognize text
	# 	# print('Recognized:', '"' + recognized[0] + '"')
	# 	print(recognized[0])




if __name__ == '__main__':
	ocr()

