import { format } from "date-fns";

interface RegexMap {
  [key: string]: RegExp;
}
export enum inputsType {
  EMAIL = "email",
  PASSWORD = "password",
  TEXT = "text",
  DATE = "date",
  TEXTAREA = "textarea",
  DESCRIPTION = "decription",
  NUMBER = "number",
  TIME = "time",
}

export enum RegisterOption {
  EMAIL = "email",
  PASSWORD = "password",
  TEXT = "text",
  FirstName = "firstName",
  LastName = "lastName",
  contactNUMBER = "contactNUMBER",
  Project = "project",
  Designation = "designation",
  District = "district",
  DateOfJoining = "dateOfJoining",
}
export const RegexPatterns: RegexMap = {
  Email: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
  Password: /^.{8,}$/,
  FirstName: /^[A-Za-z]$/,
  LastName: /^[A-Za-z]$/,
  contactNUMBER: /^(0|91)?[6789]\d{9}$/,
  DateFormat: /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD Regex
  PINCODE: /^\d{6}$/, // 6 Digit PinCode  Regex
  PASSING_YEAR: /^\d{4}$/, // 4 Digit PinCode  Regex
  PAN_NUMBER: /^([A-Z]{5})\d{4}[A-Z]{1}$/, // PAN Number
  AADHAAR_NUMBER: /^\d{12}$/, // AADHAAR  Number
};

export const acceptedAttachments = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "pdf",
  "docx",
];
export const acceptedImages = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "jpg",
  "webp",
  "png",
  "jpeg",
];

export const truncateFileName = (fileName: string) => {
  const ext = fileName.substring(fileName.lastIndexOf("."));
  return `${fileName.slice(0, 10)}...${ext}`;
};
