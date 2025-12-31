import requests
from bs4 import BeautifulSoup
from typing import List, Dict, Any, Optional
from .pdf_parser import BaseParser
import time

class NewsScraper:
    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }

    def scrape(self, url: str) -> List[Dict[str, Any]]:
        try:
            response = requests.get(url, headers=self.headers, timeout=10)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Remove scripts and styles
            for script in soup(["script", "style"]):
                script.decompose()

            # Get text
            text = soup.get_text()
            
            # Break into lines and remove leading and trailing space on each
            lines = (line.strip() for line in text.splitlines())
            # Break multi-headlines into a line each
            chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
            # Drop blank lines
            clean_text = '\n'.join(chunk for chunk in chunks if chunk)

            # Extract title
            title = soup.title.string if soup.title else url

            return [{
                "text": clean_text,
                "metadata": {
                    "source": url,
                    "title": title,
                    "scraped_at": time.strftime("%Y-%m-%d %H:%M:%S"),
                    "type": "news"
                }
            }]
        except Exception as e:
            print(f"Error scraping {url}: {e}")
            return []
