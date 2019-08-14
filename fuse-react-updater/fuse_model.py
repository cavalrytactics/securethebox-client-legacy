# reference article - https://medium.com/@pyzzled/running-headless-chrome-with-selenium-in-python-3f42d1f5ff1d
# download the chrome driver from https://sites.google.com/a/chromium.org/chromedriver/downloads and put it in the current working directory
# virtualenv venv
# source venv/bin/activate
# pip install selenium
# deactivate

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import os
import json
import requests
import subprocess

class FuseReact():
    def __init__(self):
        self.latest_fuse_version = []
        self.previous_fuse_versions = []
        self.current_fuse_version = []

    def get_latest_fuse_version(self):
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--window-size=1920x3000")
        chrome_driver = os.getcwd()+"/chromedriver"
        driver = webdriver.Chrome(chrome_options=chrome_options, executable_path=chrome_driver)
        driver.get("http://react-material.fusetheme.com/documentation/changelog")
        version = driver.find_element_by_xpath('//*[@id="fuse-layout"]/div[1]/div/div[2]/div/div[3]/div[2]/div/div/div[2]/div/div[1]/div[1]/h2').text
        self.latest_fuse_version.append(version[1::])
        return self.latest_fuse_version[0]

    def get_last_10_versions(self):
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
                self.previous_fuse_versions.append(this_version[1::])
        return self.previous_fuse_versions

    def get_current_fuse_version(self):
        # path to package.json
        # json key /Users/charleschong/go/src/securethebox/securethebox-client/package.json
        package_json = os.path.join( '..', 'package.json' )
        # load_package_json = json.loads(package_json)
        print("package_json:",package_json)
        with open(package_json, 'r') as outfile:
            json_ver = json.load(outfile)
            project_fuse_version = json_ver["fuse-react-app-version"]
            self.current_fuse_version.append(project_fuse_version)

    def update_current_fuse_version_package_json(self, new_version):
        package_json = os.path.join( '..', 'package.json' )
        with open(package_json, 'r+') as outfile:
            json_ver = json.load(outfile)
            json_ver["fuse-react-app-version"] = new_version[0]
            outfile.seek(0)        # <--- should reset file position to the beginning.
            json.dump(json_ver,outfile, indent=4)
            outfile.truncate()     # remove remaining part

    def check_current_vs_latest_fuse_version(self):
        if self.latest_fuse_version == self.current_fuse_version:
            print("Versions Match",self.latest_fuse_version,self.current_fuse_version)
            return True
        else:
            print("Versions Do Not Match",self.latest_fuse_version,self.current_fuse_version)
            return False

    def rsync_source_with_current_project(self,source_path_directory):
        print()
        
        """
        change directory to securethebox-client/src
        update all files in @fuse using rsync
        """

    def print_fuse_versions(self):
        print("latest:",self.latest_fuse_version)
        print("previous:",self.previous_fuse_versions)