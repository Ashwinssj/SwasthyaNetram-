import React, { useRef, useState } from 'react';

interface FileUploadProps {
    onUpload: (file: File) => void;
    onFileSelect: (file: File | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload, onFileSelect }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onUpload(file);
            setFileName(file.name);
            onFileSelect(file);
        } else {
            setFileName(null);
            onFileSelect(null);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.png,.jpg,.jpeg"
            />
            <button
                type="button"
                onClick={handleClick}
                className="w-full px-4 py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 rounded-lg font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-colors text-center"
            >
                {fileName ? `Selected: ${fileName}` : '+ Upload File (PDF, JPG, PNG)'}
            </button>
        </div>
    );
};

export default FileUpload;