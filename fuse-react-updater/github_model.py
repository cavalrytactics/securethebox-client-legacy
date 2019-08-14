# reference article - https://medium.com/@pyzzled/running-headless-chrome-with-selenium-in-python-3f42d1f5ff1d
# download the chrome driver from https://sites.google.com/a/chromium.org/chromedriver/downloads and put it in the current working directory
# virtualenv venv
# source venv/bin/activate
# pip install selenium
# deactivate

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from github import Github
import os
import json
import requests
import subprocess

class GitHub():
    def __init__(self):
        self.git_access_token = ""
        self.latest_fuse_version = []
        self.previous_fuse_versions = []

    def set_latest_fuse_version(self,list_of_versions):
        self.latest_fuse_version = list_of_versions
    
    def set_previous_fuse_versions(self,list_of_versions):
        self.previous_fuse_versions = list_of_versions

    def get_github_access_token(self):
         access_token = subprocess.check_output("cat ./github-access-token.txt", shell=True)
         self.git_access_token = str(access_token.decode("utf-8"))

    def search_github_for_fuse_latest(self):
        ACCESS_TOKEN = self.git_access_token
        g = Github(ACCESS_TOKEN)
        rate_limit = g.get_rate_limit()
        rate = rate_limit.search
        if rate.remaining == 0:
            print(f'You have 0/{rate.limit} API calls remaining. Reset time: {rate.reset}')
            # return
        else:
            print(f'You have {rate.remaining}/{rate.limit} API calls remaining')
    
        query = f'"fuse react" in:file extension:json filename:package.json sort:updated-desc'
        result = g.search_code(query)
    
        max_size = 100
        print(f'Found {result.totalCount} file(s)')
        if result.totalCount > max_size:
            result = result[:max_size]
    
        list_of_git_urls = []
        for file in result:
            try:
                fuse_project_version = self.search_fuse_version_github(file.download_url)
                if  fuse_project_version == self.latest_fuse_version[0] or fuse_project_version == self.previous_fuse_versions[1] or fuse_project_version == self.previous_fuse_versions[2]:
                    print(fuse_project_version,"--",file.download_url)
                    # print("FOUND:",file.download_url)
                    list_of_git_urls.append(file.download_url)
            except:
                pass
        return list_of_git_urls
    
    def search_fuse_version_github(self,git_url):
        url = str(git_url)

        headers = {
            'User-Agent': "PostmanRuntime/7.15.2",
            'Accept': "*/*",
            'Host': "raw.githubusercontent.com",
            'Accept-Encoding': "gzip, deflate",
            'Connection': "keep-alive"
            }

        response = requests.request("GET", url, headers=headers)
        json_response = json.loads(response.text)
        return str(json_response["version"])

    def get_clone_url_from_raw_git_url(self,git_url):
        git_info = git_url.split('/')
        print(git_info)
        git_user = git_info[4]
        git_project = git_info[5]
        git_clone_url = "https://github.com/"+git_user+"/"+git_project+".git"
        return git_clone_url