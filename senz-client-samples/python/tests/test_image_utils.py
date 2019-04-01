import sys
import os
import base64

sys.path.insert(
    0, os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
)
from utils.image_utils import imageToString, stringToImage


def test_imagetoString():
    file_path = (os.path.dirname(__file__))+"/sample.jpg"
    with open(file_path, "rb") as imageFile:
        assert base64.b64decode(imageToString(file_path)) == imageFile.read()
