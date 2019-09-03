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

class FuseReact():
    def __init__(self):
        self.latest_version = []
        self.previous_versions = []
        self.current_project_version = []
        self.git_access_token = ""

    def get_latest_version(self):
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--window-size=1920x3000")
        chrome_driver = os.getcwd()+"/chromedriver"
        driver = webdriver.Chrome(chrome_options=chrome_options, executable_path=chrome_driver)
        driver.get("http://react-material.fusetheme.com/documentation/changelog")
        version = driver.find_element_by_xpath('//*[@id="fuse-layout"]/div[1]/div/div[2]/div/div[3]/div[2]/div/div/div[2]/div/div[1]/div[1]/h2').text
        self.latest_version.append(version[1::])
        return self.latest_version[0]

    def get_10_versions(self):
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--window-size=1920x3000")
        chrome_driver = os.getcwd()+"/chromedriver"
        driver = webdriver.Chrome(chrome_options=chrome_options, executable_path=chrome_driver)
        driver.get("http://react-material.fusetheme.com/documentation/changelog")
        version = driver.find_element_by_xpath('//*[@id="fuse-layout"]/div[1]/div/div[2]/div/div[3]/div[2]/div/div/div[2]/div')
        for x in range(1,11):
            print(version.find_element_by_xpath('.//div['+str(x)+']/div[1]/h2').text )
            this_version = version.find_element_by_xpath('.//div['+str(x)+']/div[1]/h2').text
            if this_version == '':
                break
            else:
                self.previous_versions.append(this_version[1::])
        return self.previous_versions

    def get_current_project_version(self):
        # path to package.json
        # json key /Users/charleschong/go/src/securethebox/securethebox-client/package.json
        package_json = os.path.join( '..', 'package.json' )
        # load_package_json = json.loads(package_json)
        print("package_json:",package_json)
        with open(package_json, 'r') as outfile:
            json_ver = json.load(outfile)
            project_fuse_version = json_ver["fuse-react-app-version"]
            self.current_project_version.append(project_fuse_version)
        
    def check_current_vs_latest_version(self):
        if self.latest_version == self.current_project_version:
            print("Versions Match",self.latest_version,self.current_project_version)
            return True
        else:
            print("Versions Do Not Match",self.latest_version,self.current_project_version)
            return False

    def rsync_source_with_current_project(self,source_path_directory):
        print()
        
        """
        change directory to securethebox-client/src
        update all files in @fuse using rsync
        """

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
            fuse_project_version = self.search_fuse_version_github(file.download_url)
            if  fuse_project_version == self.latest_version[0] or fuse_project_version == self.previous_versions[1]:
                print(fuse_project_version,"--",file.download_url)
                # print("FOUND:",file.download_url)
                list_of_git_urls.append(file.download_url)
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
    
    def print_versions(self):
        print("latest:",self.latest_version)
        print("previous:",self.previous_versions)

    def get_clone_url_from_raw_git_url(self,git_url):
        git_info = git_url.split('/')
        print(git_info)
        git_user = git_info[4]
        git_project = git_info[5]
        git_clone_url = "https://github.com/"+git_user+"/"+git_project+".git"
        return git_clone_url

    def clone_git_repo(self,git_clone_url):
        print()

    def copy_source_fuse_to_project(self):
        # source
        # destination
        print()


if __name__ == "__main__":
    fuse = FuseReact()
    fuse.get_10_versions()
    fuse.get_current_project_version()
    fuse.get_latest_version()
    # compare current project with latest version
    version_check = fuse.check_current_vs_latest_version()
    # if latest version does not equal current version
    if version_check == False:
        # get load github access token
        fuse.get_github_access_token()
        # search github for fuse with latest version
        list_of_git_repos = fuse.search_github_for_fuse_latest()
        print(list_of_git_repos)
        # print(list_of_git_repos)

"""
1. compare current project with latest version

2. if latest version > current version
3. search github for fuse with latest version
4. git clone project with latest version
5. use rsync to update cloned code with current project src/@fuse code
6. diff cloned package.json dependencies with current project
- some of the dependencies in current project are not in cloned
- so we need to at least have all the cloned dependancies
8. copy all the same dependancies over to current project
7. delete node_modues
8. yarn install
8. yarn test
"""