#ver 2.1_231118
#   .env설정파일 확인 후 실행
#   pip install -r requirements.txt 

#==========================위 명령이 성공하면 아래는 안해도됨
# pip install openai
# pip install dotenv
# pip install load_dotenv
# pip install re -> 실패시 무시가능

import os
import sys
import openai
import re
import urllib.request
import json
from dotenv import load_dotenv

class OpenAIGpt:
    def __init__(self):
        load_dotenv()
    def mainChaSeKi(self, userQuery):
        sendMessage = []
        defaultQuery = os.getenv("defaultQuery")
        sendMessage.append({"role": "system", "content": defaultQuery})
        sendMessage.append({"role": "user", "content": userQuery})
        try:
            openai.api_key = os.getenv("OPENAI_API_KEY")
            assistant_content = self.get_assistant_response(sendMessage)
            life =0
            targetWord = ["exercise", "daily life", "meals", "places", "weather", "transportation", "et cetera"]
            while(life<3):
                extracted_targetWord = re.search(r"\[(.*?)\]", assistant_content)
                if extracted_targetWord:
                    extracted_targetWord = extracted_targetWord.group(1)                  
                    if extracted_targetWord in targetWord:
                        return extracted_targetWord
                    else :
                        print("2")
                        assistant_content = self.get_assistant_response(sendMessage)
                        life += 1
                        print(str(life)+"번쨰 시도입니다.")
                        continue
                else:
                    print("1")
                    assistant_content = self.get_assistant_response(sendMessage)
                    life += 1
                    print(str(life)+"번쨰 시도입니다.")
                    continue                                
            return None
        except Exception as e:
            print(f"Error: {e}")
            return None
        
    def translator(self, userQuery):
        client_id = os.getenv("YOUR_CLIENT_ID")
        client_secret = os.getenv("YOUR_CLIENT_SECRET")
        encText = urllib.parse.quote(userQuery.encode("utf-8"))
        data = "source=ko&target=en&text=" + encText
        url = "https://openapi.naver.com/v1/papago/n2mt"
        request = urllib.request.Request(url)
        request.add_header("X-Naver-Client-Id", client_id)
        request.add_header("X-Naver-Client-Secret", client_secret)
        try:
            response = urllib.request.urlopen(request, data=data.encode("utf-8"), timeout=1)
            rescode = response.getcode()

            if rescode == 200:
                response_body = response.read()
                data = json.loads(response_body)
                translated_text = data['message']['result']['translatedText']
                return translated_text
            else:
                return userQuery

        except urllib.error.URLError as e:
            return userQuery
        

    def get_assistant_response(self, sendMessage):
        completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=sendMessage)
        assistant_content = completion.choices[0].message["content"].strip() 
        return assistant_content
    
    def run(self, query):
        EnQuery = self.translator(query)
        if EnQuery: 
            print(EnQuery)
            extracted_targetWord = self.mainChaSeKi(EnQuery)
            if extracted_targetWord:
                response = extracted_targetWord
                print(response)
                return response
        else:
            print("0")
        return None

if __name__ == '__main__':
    if len(sys.argv) < 2:
        query = input("문장을 입력해주세요 : ")        
    else :
        query = " ".join(sys.argv[1:])
    openai_gpt = OpenAIGpt()    
    openai_gpt.run(query)