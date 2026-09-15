import fitz
import glob
import os

pdfs = glob.glob('*.pdf')
for pdf in pdfs:
    if pdf == 'Kashaboina Charan Resume.pdf':
        continue
    doc = fitz.open(pdf)
    page = doc.load_page(0)
    pix = page.get_pixmap(dpi=150)
    name = os.path.splitext(pdf)[0] + '.jpg'
    pix.save(name)
    print(f'Converted {pdf} to {name}')

