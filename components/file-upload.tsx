'use client';

import { FileIcon, X } from 'lucide-react';
import Image from 'next/image';

import { UploadDropzone } from '@/lib/uploadthing';

interface FileUploadProps {
  endpoint: 'messageFile' | 'serverImage';
  value: string;
  onChange: (url?: string) => void;
}

const FileUpload = ({ endpoint, value, onChange }: FileUploadProps) => {
  const fileType = value?.split('.').pop();

  if (value && fileType !== 'pdf') {
    return (
      <div className="w-full flex items-center justify-center">
        <div className="relative h-20 w-20">
          <Image src={value} alt="Server image" fill className="rounded-full" />

          <button
            onClick={() => onChange('')}
            className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  if (value && fileType === 'pdf') {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
        >
          {value}
        </a>
        <button
          onClick={() => onChange('')}
          className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full">
      <UploadDropzone
        className="
          w-full 
          cursor-pointer 
          border-dashed 
          border-2 
          border-neutral-400 
          rounded-xl 
          py-4 
          ut-button:bg-indigo-500
          ut-button:text-[0.9rem]
          ut-button:hover:bg-indigo-500/90 
          ut-button:px-4 
          ut-button:mt-4 
          ut-label:text-indigo-500 
          ut-upload-icon:w-[60px] 
          ut-upload-icon:sm:w-[70px] 
          ut-upload-icon:text-neutral-600/90
        "
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log('Files: ', res);
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          console.log(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
};

export default FileUpload;
