import os
import glob

res = glob.glob('' '*/migrations/*.py', recursive=True)
for file_path in res:
    if not file_path.endswith('\__init__.py') and file_path.endswith('/__init__.py'):
        os.remove(file_path)
print ('done')

# from pathlib import Path
# for file_obj in Path('.').glob('*/migrations/*.py'):
#     if file_obj.name != '__init__.py':
#         try:
#             os.remove(file_obj._str)
#         except:
#             print(file_obj)