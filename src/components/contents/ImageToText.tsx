import { useRef, useState } from 'react';
import { createWorker } from 'tesseract.js';

export default function ImageToText() {
  const [image, setImage] = useState<string | null>(null);
  const [text, setText] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 이미지 업로드 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      setText(''); // 이전 결과 초기화
    };
    reader.readAsDataURL(file);
  };

  // OCR 실행
  const handleExtractText = async () => {
    if (!image) return;
    setLoading(true);
    setText('');
    const worker = await createWorker('kor+eng'); // 한글+영어 지원
    const { data } = await worker.recognize(image);
    setText(data.text);
    setLoading(false);
    await worker.terminate();
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-card rounded-lg shadow space-y-4">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleImageChange}
      />
      <button
        className="bg-primary text-primary-foreground px-4 py-2 rounded"
        onClick={() => fileInputRef.current?.click()}
        aria-label="이미지 업로드"
      >
        이미지 업로드
      </button>
      {image && (
        <div className="flex flex-col items-center space-y-2">
          <img src={image} alt="업로드 이미지" className="max-h-64 rounded" />
          <button
            className="bg-secondary text-secondary-foreground px-4 py-2 rounded"
            onClick={handleExtractText}
            disabled={loading}
          >
            {loading ? '텍스트 추출 중...' : '텍스트 추출'}
          </button>
        </div>
      )}
      {text && (
        <div className="mt-4 p-4 bg-muted rounded text-foreground whitespace-pre-wrap">
          <strong>추출된 텍스트:</strong>
          <div>{text}</div>
        </div>
      )}
    </div>
  );
}
