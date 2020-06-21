---
title: "Old Project: Darlene Automation"
author: Harrold Lechuga
date: 2018-11-27
categories: ["", Projects]
tags: [Selenium, Web scrape]
toc: false
image_hide: true
status: draft
---

## Story



## How it works

First, it reads the configuration file containing the projects' information and save them to list `project_info`. Then, it puts them to the queue waiting to be consumed by the thread. 

```python
import threading, queue # multithreading
...
q = queue.Queue()
qr = queue.Queue()
...
for each_section in projects.sections():
    info = {
        'name': projects.get(each_section, 'name'),
        'url': projects.get(each_section, 'url'),
        'pass': projects.get(each_section, 'pass'),
        'folder': projects.get(each_section, 'folder'),
        'is_direct': projects.getboolean(each_section, 'is_direct'),
    }
    info['folder_url'] = info['url'] + r'?path=%2F' + info['folder'].replace(' ', '%20')
    project_info.append(info)

for project in project_info:
    q.put(project)
```



We have 4 thread workers that will start consuming the queue.  The workers will receive the project's queue`q`, queue results`qr` and lock`lock`. I will explain the lock later. 

```python
number_of_threads = 4
    threads = []
    for _ in range(number_of_threads):
        thread_worker = worker.Worker(q, qr, lock)
        threads.append(thread_worker)
        thread_worker.start()
```



Inside the worker, we have initialized selenium and chrome options to set logging and download behavior

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

chrome_options_1 = Options()
chrome_options_1.add_argument("--log-level=3")
chrome_options_1.add_argument("--silent")
chrome_options_1.add_experimental_option("prefs", {
    "download.default_directory": self.downloads_directory,
    "download.prompt_for_download": False,
    "download.directory_upgrade": True,
    "safebrowsing.enabled": True
    })
```





```python
class Worker(threading.Thread):
    def __init__(self, q, qr, lock):
        super().__init__()
        self.q = q
        self.qr = qr
        self.lock = lock
        self.browser = None
        
    def run(self):
        while not self.q.empty():
            self.html = ''
            self.item = self.q.get()
```



```python
self.browser = webdriver.Chrome(chrome_driver, chrome_options=chrome_options_1)
self.browser.set_window_size(1000, 800)
self.browser.set_page_load_timeout(600)
```



```python
def load_with_retry(self, url, identifier):
    retry = 5
    for attempt in range(retry):
        try:
            self.browser.get(url)
            WebDriverWait(self.browser, 5).until(EC.presence_of_element_located((By.ID, str(identifier))))
        except Exception:
            log.debug('%s did not load normally. Retrying: %d', url, attempt)
            continue
            break
    util.scroll_page(self.browser)
```





```python
if self.item['pass'] == '':
    log.info('%s - No authentication required. Opening page...', self.item['name'])
    self.load_with_retry(self.item['url'], 'filestable')

else:
    log.info('%s - Authentication required. Logging in...', self.item['name'])
    self.load_with_retry(self.item['url'], "password")
    key = self.browser.find_element_by_id("password")
    key.send_keys(self.item['pass'])
    key.submit()
    log.info('%s - Authenticated. logged in successfully!', self.item['name'])
    util.scroll_page(self.browser)
```



```python
dirs = list()
for d in self.browser.find_elements_by_xpath("//tr[@data-type='dir']"):
    directory = get_directory_info(d)
    date_delta = date_now - directory['date']
    if date_delta.days <= 31:                    
        self.html = self.html + '<p><a href="{}">{}</a><code class="green">{}</code><code class="green">{}</code></p>'.format(directory['url'], directory['name'], directory['date'].strftime("%B %d %Y"), directory['date_span'])
    elif date_delta.days > 31 and date_delta.days <=62:
        self.html = self.html + '<p><a href="{}">{}</a><code class="yellow">{}</code><code class="green">{}</code></p>'.format(directory['url'], directory['name'], directory['date'].strftime("%B %d %Y"), directory['date_span'])
    else:
        self.html = self.html + '<p><a href="{}">{}</a><code class="gray">{}</code><code class="green">{}</code></p>'.format(directory['url'], directory['name'], directory['date'].strftime("%B %d %Y"), directory['date_span'])

# go to call report folder
self.load_with_retry(self.item['folder_url'], "filestable")
```



```python
files = list()
for f in self.browser.find_elements_by_xpath("//tr[@data-type='file']"):
    x = get_file_info(f)
    files.append(x)
log.info('%s - Collection completed!', self.item['name'])
# filter all zip files in the list that was updated within the given desired days. 
for file_item in files:
    date_delta = date_now - file_item['date']
    if file_item['extension'] == '.zip' and date_delta.days < desired_days:
        # clear download folder before downloading files
        util.clear_directory(self.downloads_directory)
```



```python
is_downloaded = False
while not is_downloaded:
    if os.listdir(var.downloads_directory) != []:
        for x in os.listdir(var.downloads_directory):
            if re.match(r'.+?zip$', x):
                is_downloaded = True
            time.sleep(0.5)
    else:
        time.sleep(1)
```



```python
for zfile in os.listdir(downloads_directory):
    zip_object = zipfile.ZipFile(downloads_directory + '\\' + zfile)
target_file = ''
for zinfo in zip_object.infolist():
    if re.match(pattern, zinfo.filename):
        target_file = zinfo
        print('Extracting', target_file.filename, '...')
return zip_object, target_file.filename
```



```python
while True:
    try:
        zip_object.extract(target_file, target_dest)
        break
    except:
        print("File Permission Denied! {} is opened. Please close Excel application or any of \
                the opened files in downloads folder".format(target_file))
        input("Press any key")
zip_object.close()
```



```python
if call_report_excel:
    log.info('%s - Reading %s', self.item['name'], call_report_excel)
    # read excel sheet to pandas' data frame
    target_excel = os.path.join(target_destination, call_report_excel)
    dfcr = pd.read_excel(target_excel, sheet_name='Raw Data1')
    
    # group table that contains only data needed for report
    tbcr = dfcr.groupby(['dm', 'mr_name']).agg({
        'doctor_code': 'count', 'treach':'sum', 'reach': 'sum', 'ntreach':'sum',
        'target':'sum', 'missed':'sum', 'concentration':'sum', 'planned':'sum',
        'wk1': 'sum', 'wk2': 'sum', 'wk3': 'sum', 'wk4': 'sum', 'wk5': 'sum'
        })
    # compute call reports
    log.info('%s - Computing calls data from %s', self.item['name'], call_report_excel)
    actual_calls = tbcr['reach'].replace(np.NaN, 0).sum()
    target_calls = tbcr['ntreach'].replace(np.NaN, 0).sum()
    call_reach = ((actual_calls/target_calls) * 100).round(2)
    actual_total = tbcr['planned'].replace(np.NaN, 0).sum()
    target_plan = tbcr['target'].replace(np.NaN, 0).sum()
    call_rate = ((actual_total / target_plan) * 100).round(2)
    with_mcp = tbcr['target'].replace(np.NaN, 0).count()

    #compute weekly calls
    weekly_calls = []
    for week in 'wk1','wk2', 'wk3', 'wk4', 'wk5':
        calls = tbcr[week].replace(0, np.NaN).count()
        weekly_calls.append(calls)

    # compute weekly call under compliance
    weekly_calls_complied = []
    for week in weekly_calls:
        complied = ((week / with_mcp) *100).round(2)
        weekly_calls_complied.append(complied)

# else no call report file found, skip computation
else:
    log.info('%s - No call report found. Skipping computation', self.item['name'])
```



```python
if raw_data_excel:
    try:
        log.info('%s - Reading %s', self.item['name'], raw_data_excel)
        target_excel = os.path.join(target_destination, raw_data_excel)
        dfrd = pd.read_excel(target_excel, sheet_name='SUMMARY OF CALLS', header=2)

        log.info('%s - Computing location data from %s', self.item['name'], raw_data_excel)
        location = dfrd['COORDINATES'].replace('0,0', np.NaN).count()
        location_total = dfrd['COORDINATES'].count()
        location_rate = ((dfrd['COORDINATES'].replace('0,0', np.NaN).count() / dfrd['COORDINATES'].count()) * 100).round(2)
    except:
        location = ''
        location_total = ''
        location_rate = ''
        log.error('%s - Cannot read excel file', self.item['name'], exc_info=True)
    
# else no call report file found, skip computation
else:
    location = ''
    location_total = ''
    location_rate = ''
    log.info('%s - No raw data found. Skipping computation', self.item['name'])
```





```python
self.lock.acquire()
self.qr.put((self.html,))
self.lock.release()

#close the browser
self.browser.close()
```





```python
for x in threads:
    x.join()

while not qr.empty():
    my_html.append(qr.get()[0])
```

