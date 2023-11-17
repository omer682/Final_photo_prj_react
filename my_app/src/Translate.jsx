import React from 'react';

const Translate = ({ errorMessage }) => {
  let translatedMessage = [];
  const errorsDict = {
    "User account is disabled.": "ההמשתמש לא רשאי לגשת לאתר",
    'user with this email already exists.': "האימייל שהכנסת כבר בשימוש.",
    "Upload a valid image. The file you uploaded was either not an image or a corrupted image.": "יש להעלות תמונות בלבד עם פורמט תקין",
    'Must include email and password': 'יש לציין אימייל וסיסמה',
    'Unable to log in with provided credentials.': 'שם משתמש או סיסמה שגויים',
    "Enter a valid email address.": "הכנס כתובת אימייל תקינה.",
    "Field can contain between 2-15 characters in English or Hebrew only.": "שדה זה יכול להכיל בין 2 ל-15 תווים באנגלית או עברית בלבד.",
    "Enter a valid phone number": "יש להזין מספר טלפון תקין",
    "Field can contain between 3-20 characters in English or Hebrew only.": "השדה זה יכול להכיל בין 3 ל-20 תווים באנגלית או בעברית בלבד.",
    "Field can contain between 3-20 characters in Hebrew.": "שדה זה יכול להכיל בין 3 ל-20 תווים בעברית.",
    "Date has wrong format. Use one of these formats instead: YYYY-MM-DD.": "התאריך בפורמט שגוי. השתמש באחד מהפורמטים הבאים במקום: YYYY-MM-DD.",
    "This field may not be blank.": "שדה זה אינו יכול להיות ריק.",
    "The submitted file is empty.": "הקובץ שהתקבל ריק",
    "album name is already exist" : "אלבום עם שם זה כבר קיים",
    "File extension “” is not allowed. Allowed extensions are: bmp, dib, gif, jfif, jpe, jpg, jpeg, pbm, pgm, ppm, pnm, png, apng, blp, bufr, cur, pcx, dcx, dds, ps, eps, fit, fits, fli, flc, ftc, ftu, gbr, grib, h5, hdf, jp2, j2k, jpc, jpf, jpx, j2c, icns, ico, im, iim, mpg, mpeg, tif, tiff, mpo, msp, palm, pcd, pdf, pxr, psd, qoi, bw, rgb, rgba, sgi, ras, tga, icb, vda, vst, webp, wmf, emf, xbm, xpm.": 
    "הסיומת של הקובץ  אינה מורשית. הסיומות המותרות הן: bmp, dib, gif, jfif, jpe, jpg, jpeg, pbm, pgm, ppm, pnm, png, apng, blp, bufr, cur, pcx, dcx, dds, ps, eps, fit, fits, fli, flc, ftc, ftu, gbr, grib, h5, hdf, jp2, j2k, jpc, jpf, jpx, j2c, icns, ico, im, iim, mpg, mpeg, tif, tiff, mpo, msp, palm, pcd, pdf, pxr, psd, qoi, bw, rgb, rgba, sgi, ras, tga, icb, vda, vst, webp, wmf, emf, xbm, xpm."
  };

  if (typeof errorMessage === "undefined") {
    translatedMessage.push("שדה לא תקין");
  } else if (Array.isArray(errorMessage)) {
    errorMessage.forEach((message) => {
      if (message.startsWith('Ensure this field has no more than')) {
        translatedMessage.push(`שדה זה יכול להכיל עד -${message.match(/(\d+)/)[0]} תווים`);
      } else if (message.startsWith('Ensure this field has at least')) {
        translatedMessage.push(`שדה חייב להכיל לפחות -${message.match(/(\d+)/)[0]} תווים`);
      } else if (message.startsWith('Ensure this value is greater than or equal to')) {
        const number = message.match(/(\d+)/)[0];
        translatedMessage.push(`ודא שהערך הוא גדול או שווה ל-${number}`);
      } else {
        translatedMessage.push(errorsDict[message] ? errorsDict[message] : message);
      }
    });
  }

  return (
    <>
      {translatedMessage.map((message, index) => (
        <li key={index}>{message}</li>
      ))}
    </>
  );
};

export default Translate;