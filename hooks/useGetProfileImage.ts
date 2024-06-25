import { ChangeEvent, useState } from "react";

import { postProfileImageUrl } from "@/apis/apis";

/**
 * 이미지 파일을 업로드하면, S3 이미지 링크를 반환합니다.
 * @returns S3 이미지 url, 프로필 이미지 변경 함수
 */
const useGetProfileImage = (initialImgUrl: string | null) => {
  const [uploadedImgUrl, setUploadedImgUrl] = useState<string | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(initialImgUrl);

  const handleProfileImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const imageFile = e.target.files[0];
    const maxSize = 1 * 1024 * 1024;

    if (imageFile.size > maxSize) {
      alert("파일 크기는 1MB를 초과할 수 없습니다"); // TODO: 추후 toast로 변경 예정
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setUploadedImgUrl(fileReader.result as string);
    };
    fileReader.readAsDataURL(imageFile);

    const formData = new FormData();
    formData.append("multipartFile", imageFile);

    const { imgUrl } = await postProfileImageUrl(formData);

    setImgUrl(imgUrl);
  };

  return { uploadedImgUrl, imgUrl, handleProfileImageChange };
};

export default useGetProfileImage;
