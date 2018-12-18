import base64
import os
import sys

import numpy as np

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



def save_img(dataurl,filename):
	ext = filename.split('.')[1]
	img_pth = module_pth + '/src/input.' + ext
	dataurl=base64.b64decode(dataurl)
	image_result = open(img_pth, 'wb')
	image_result.write(dataurl)
	image_result.close()
	return img_pth



def getTextIcr(dataurl,filename):
	img_pth=save_img(dataurl,filename)

	os.system(module_pth+'/src/textcleaner -g -e stretch -f 25 -o 10 -s 1 ' + img_pth + ' '+module_pth  +'/src/result1.png')

	image = cv2.imread(module_pth  +'/src/result1.png')
	# cv2.imshow('orig',image)
	# cv2.waitKey(0)

	# grayscale
	gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
	# cv2.imshow('gray', gray)
	# cv2.waitKey(0)
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
	text=""
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
		print(recognized[0])
		text +=recognized[0] +" "

	# cv2.imshow('orig', image)
	# cv2.waitKey(0)
	return text

def getTextOcr(dataurl,filename):
	img_pth = save_img(dataurl,filename)
	os.system('tesseract ' + ' '+img_pth +' '+ module_pth+'/src/output')
	text_file = open(module_pth+"/src/output.txt", "r")
	lines=text_file.read()
	lines.replace("\n","")
	print(lines)
	return lines





if __name__ == '__main__':
	main2()

