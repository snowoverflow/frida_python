import frida
import sys
import codecs

def message(message,data):
    if message['type'] == 'send':
          print(message['payload'])         
    else:
          print(message)

rdev = frida.get_remote_device()
process = rdev.attach("com.yangjl.fridademo")
with codecs.open('./python/fridademo.js','r','utf-8') as f:
  source = f.read()
script = process.create_script(source)
script.on('message',message)
script.load()
sys.stdin.read()