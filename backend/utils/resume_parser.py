import os
import io
import docx
import PyPDF2

def parse_resume(file_bytes: bytes, filename: str) -> str:
    """
    Parse resume text from uploaded file.
    Supports PDF, DOCX, and TXT.
    """
    ext = os.path.splitext(filename)[1].lower()

    if ext == ".pdf":
        return parse_pdf(file_bytes)
    elif ext == ".docx":
        return parse_docx(file_bytes)
    elif ext == ".txt":
        return parse_txt(file_bytes)
    else:
        raise ValueError("Unsupported file type. Please upload PDF, DOCX, or TXT.")

def parse_pdf(file_bytes: bytes) -> str:
    """
    Extract text from PDF files using PyPDF2
    """
    text = ""
    pdf_reader = PyPDF2.PdfReader(io.BytesIO(file_bytes))
    for page in pdf_reader.pages:
        text += page.extract_text() or ""
    return text.strip()

def parse_docx(file_bytes: bytes) -> str:
    """
    Extract text from DOCX files using python-docx
    """
    text = ""
    doc = docx.Document(io.BytesIO(file_bytes))
    for para in doc.paragraphs:
        text += para.text + "\n"
    return text.strip()

def parse_txt(file_bytes: bytes) -> str:
    """
    Extract text from TXT files
    """
    return file_bytes.decode("utf-8").strip()
