import fitz  # PyMuPDF
from docx import Document
import io

def _extract_pdf_text(file_bytes: bytes) -> str:
    text = []
    with fitz.open(stream=file_bytes, filetype="pdf") as doc:
        for page in doc:
            text.append(page.get_text("text"))
    return "\n".join(text)

def _extract_docx_text(file_bytes: bytes) -> str:
    # python-docx supports file-like object from bytes
    buf = io.BytesIO(file_bytes)
    doc = Document(buf)
    return "\n".join(p.text for p in doc.paragraphs)

def extract_text_any(file_bytes: bytes, filename: str) -> str:
    name = filename.lower()
    if name.endswith(".pdf"):
        return _extract_pdf_text(file_bytes).strip()
    if name.endswith(".docx"):
        return _extract_docx_text(file_bytes).strip()
    # (Optional) add .txt support
    if name.endswith(".txt"):
        return file_bytes.decode("utf-8", errors="ignore")
    raise ValueError("Unsupported file type. Please upload PDF or DOCX.")
