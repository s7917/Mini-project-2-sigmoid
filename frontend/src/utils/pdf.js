// function escapePdfText(text) {
//   return String(text || '')
//     .replace(/\\/g, '\\\\')
//     .replace(/\(/g, '\\(')
//     .replace(/\)/g, '\\)');
// }

// function wrapLines(text, maxChars = 78) {
//   const words = String(text || '').split(/\s+/).filter(Boolean);
//   const lines = [];
//   let current = '';

//   words.forEach((word) => {
//     const candidate = current ? `${current} ${word}` : word;
//     if (candidate.length > maxChars) {
//       lines.push(current);
//       current = word;
//     } else {
//       current = candidate;
//     }
//   });

//   if (current) lines.push(current);
//   return lines;
// }

// function buildPdfBlob(title, bodyLines) {
//   const allLines = [title, '', ...bodyLines].flatMap((line) => wrapLines(line));
//   const safeLines = allLines.slice(0, 44);
//   const content = [
//     'BT',
//     '/F1 12 Tf',
//     '50 790 Td',
//     ...safeLines.map((line, index) => `${index === 0 ? '' : '0 -16 Td'} (${escapePdfText(line)}) Tj`).filter(Boolean),
//     'ET'
//   ].join('\n');

//   const objects = [
//     '1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj',
//     '2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj',
//     '3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >> endobj',
//     '4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj',
//     `5 0 obj << /Length ${content.length} >> stream\n${content}\nendstream endobj`
//   ];

//   let pdf = '%PDF-1.4\n';
//   const offsets = [0];
//   objects.forEach((object) => {
//     offsets.push(pdf.length);
//     pdf += `${object}\n`;
//   });

//   const xrefOffset = pdf.length;
//   pdf += `xref\n0 ${objects.length + 1}\n`;
//   pdf += '0000000000 65535 f \n';
//   offsets.slice(1).forEach((offset) => {
//     pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
//   });
//   pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

//   return new Blob([pdf], { type: 'application/pdf' });
// }

// function buildStyledCertificatePdfBlob({ learnerName, courseTitle, completedDate }) {
//   const safeName = escapePdfText(learnerName || 'Learner');
//   const safeDate = escapePdfText(completedDate || '');
//   const courseLines = wrapLines(courseTitle || 'Course', 34).slice(0, 2).map(escapePdfText);
//   const title = 'CERTIFICATE OF COMPLETION';
//   const subtitle = 'This certificate is proudly presented to';
//   const body = 'for successfully completing the course';
//   const brand = 'SIGVERSE ACADEMY';
//   const signature = 'Sigverse Learning';
//   const signatureRole = 'DIRECTOR OF LEARNING';

//   const content = [
//     'q',
//     '0.95 0.97 1 rg',
//     '28 28 786 539 re',
//     'f',
//     'Q',
//     'q',
//     '0.78 0.84 0.95 RG',
//     '1.2 w',
//     '28 28 786 539 re',
//     'S',
//     'Q',
//     'q',
//     '0.92 0.96 1 rg',
//     '650 28 164 539 re',
//     'f',
//     'Q',
//     'BT',
//     '/F1 11 Tf',
//     '0.28 0.3 0.36 rg',
//     '52 520 Td',
//     `(${escapePdfText(brand)}) Tj`,
//     'ET',
//     'BT',
//     '/F2 38 Tf',
//     '0.14 0.17 0.24 rg',
//     '170 430 Td',
//     `(${escapePdfText(title)}) Tj`,
//     'ET',
//     'BT',
//     '/F1 16 Tf',
//     '0.38 0.42 0.48 rg',
//     '250 385 Td',
//     `(${escapePdfText(subtitle)}) Tj`,
//     'ET',
//     'BT',
//     '/F3 48 Tf',
//     '0.15 0.34 0.72 rg',
//     '225 315 Td',
//     `(${safeName}) Tj`,
//     'ET',
//     'BT',
//     '/F1 16 Tf',
//     '0.34 0.37 0.44 rg',
//     '235 250 Td',
//     `(${escapePdfText(body)}) Tj`,
//     'ET',
//     'BT',
//     '/F2 28 Tf',
//     '0.13 0.15 0.2 rg',
//     '210 198 Td',
//     ...(courseLines.map((line, idx) => `${idx === 0 ? '' : '0 -34 Td'} (${line}) Tj`).filter(Boolean)),
//     'ET',
//     'BT',
//     '/F1 14 Tf',
//     '0.36 0.4 0.46 rg',
//     '52 86 Td',
//     '(Date) Tj',
//     '0 -28 Td',
//     '/F2 24 Tf',
//     '0.13 0.15 0.2 rg',
//     `(${safeDate}) Tj`,
//     'ET',
//     'BT',
//     '/F3 36 Tf',
//     '0.11 0.15 0.22 rg',
//     '585 98 Td',
//     `(${escapePdfText(signature)}) Tj`,
//     '0 -30 Td',
//     '/F1 12 Tf',
//     '0.36 0.4 0.46 rg',
//     `(${escapePdfText(signatureRole)}) Tj`,
//     'ET'
//   ].join('\n');

//   const objects = [
//     '1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj',
//     '2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj',
//     '3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 842 595] /Resources << /Font << /F1 4 0 R /F2 5 0 R /F3 6 0 R >> >> /Contents 7 0 R >> endobj',
//     '4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj',
//     '5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Times-Bold >> endobj',
//     '6 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Times-Italic >> endobj',
//     `7 0 obj << /Length ${content.length} >> stream\n${content}\nendstream endobj`
//   ];

//   let pdf = '%PDF-1.4\n';
//   const offsets = [0];
//   objects.forEach((object) => {
//     offsets.push(pdf.length);
//     pdf += `${object}\n`;
//   });

//   const xrefOffset = pdf.length;
//   pdf += `xref\n0 ${objects.length + 1}\n`;
//   pdf += '0000000000 65535 f \n';
//   offsets.slice(1).forEach((offset) => {
//     pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
//   });
//   pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

//   return new Blob([pdf], { type: 'application/pdf' });
// }

// export function downloadCoursePdf(course) {
//   const sections = [
//     `Category: ${course.category || 'General'}`,
//     `Instructor: ${course.instructor_name || 'Unknown'}`,
//     course.description || 'No course description available.',
//     ...(course.modules || []).flatMap((moduleItem, moduleIndex) => [
//       '',
//       `Module ${moduleIndex + 1}: ${moduleItem.module_name}`,
//       ...(moduleItem.lessons || []).map((lesson, lessonIndex) => `  Lesson ${lessonIndex + 1}: ${lesson.lesson_name}`)
//     ])
//   ];

//   triggerDownload(`${course.title || 'course'}-overview.pdf`, buildPdfBlob(course.title || 'Course Overview', sections));
// }

// export function downloadModulePdf(course, moduleItem) {
//   const sections = [
//     `Course: ${course?.title || 'Course'}`,
//     `Module: ${moduleItem?.module_name || 'Module'}`,
//     ...(moduleItem?.lessons || []).flatMap((lesson, index) => [
//       '',
//       `Lesson ${index + 1}: ${lesson.lesson_name}`,
//       lesson.content || 'No detailed content available.'
//     ])
//   ];

//   triggerDownload(`${moduleItem?.module_name || 'module'}-resources.pdf`, buildPdfBlob(moduleItem?.module_name || 'Module Resources', sections));
// }

// export function downloadCertificatePdf({ learnerName, courseTitle, completedDate }) {
//   triggerDownload(
//     `${courseTitle || 'course'}-certificate.pdf`,
//     buildStyledCertificatePdfBlob({ learnerName, courseTitle, completedDate })
//   );
// }

// function triggerDownload(filename, blob) {
//   const url = URL.createObjectURL(blob);
//   const anchor = document.createElement('a');
//   anchor.href = url;
//   anchor.download = filename;
//   anchor.click();
//   URL.revokeObjectURL(url);
// }









function escapePdfText(text) {
  return String(text || '')
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

function wrapLines(text, maxChars = 78) {
  const words = String(text || '').split(/\s+/).filter(Boolean);
  const lines = [];
  let current = '';

  words.forEach((word) => {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxChars) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  });

  if (current) lines.push(current);
  return lines;
}

function buildPdfBlob(title, bodyLines) {
  const allLines = [title, '', ...bodyLines].flatMap((line) => wrapLines(line));
  const safeLines = allLines.slice(0, 44);
  const content = [
    'BT',
    '/F1 12 Tf',
    '50 790 Td',
    ...safeLines.map((line, index) => `${index === 0 ? '' : '0 -16 Td'} (${escapePdfText(line)}) Tj`).filter(Boolean),
    'ET'
  ].join('\n');

  const objects = [
    '1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj',
    '2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj',
    '3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >> endobj',
    '4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj',
    `5 0 obj << /Length ${content.length} >> stream\n${content}\nendstream endobj`
  ];

  let pdf = '%PDF-1.4\n';
  const offsets = [0];
  objects.forEach((object) => {
    offsets.push(pdf.length);
    pdf += `${object}\n`;
  });

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += '0000000000 65535 f \n';
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
  });
  pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return new Blob([pdf], { type: 'application/pdf' });
}

function buildStyledCertificatePdfBlob({ learnerName, courseTitle, completedDate }) {
  const safeName = escapePdfText(learnerName || 'Learner');
  const safeDate = escapePdfText(completedDate || '');
  const courseLines = wrapLines(courseTitle || 'Course', 34).slice(0, 2).map(escapePdfText);
  const title = 'CERTIFICATE OF COMPLETION';
  const subtitle = 'This certificate is proudly presented to';
  const body = 'for successfully completing the course';
  const brand = 'SIGVERSE ACADEMY';
  const signature = 'Sigverse Learning';
  const signatureRole = 'DIRECTOR OF LEARNING';

  const content = [
    'q',
    '0.95 0.97 1 rg',
    '28 28 786 539 re',
    'f',
    'Q',
    'q',
    '0.78 0.84 0.95 RG',
    '1.2 w',
    '28 28 786 539 re',
    'S',
    'Q',
    'q',
    '0.92 0.96 1 rg',
    '650 28 164 539 re',
    'f',
    'Q',
    'BT',
    '/F1 11 Tf',
    '0.28 0.3 0.36 rg',
    '52 520 Td',
    `(${escapePdfText(brand)}) Tj`,
    'ET',
    'BT',
    '/F2 38 Tf',
    '0.14 0.17 0.24 rg',
    '170 430 Td',
    `(${escapePdfText(title)}) Tj`,
    'ET',
    'BT',
    '/F1 16 Tf',
    '0.38 0.42 0.48 rg',
    '250 385 Td',
    `(${escapePdfText(subtitle)}) Tj`,
    'ET',
    'BT',
    '/F3 48 Tf',
    '0.15 0.34 0.72 rg',
    '225 315 Td',
    `(${safeName}) Tj`,
    'ET',
    'BT',
    '/F1 16 Tf',
    '0.34 0.37 0.44 rg',
    '235 250 Td',
    `(${escapePdfText(body)}) Tj`,
    'ET',
    'BT',
    '/F2 28 Tf',
    '0.13 0.15 0.2 rg',
    '210 198 Td',
    ...(courseLines.map((line, idx) => `${idx === 0 ? '' : '0 -34 Td'} (${line}) Tj`).filter(Boolean)),
    'ET',
    'BT',
    '/F1 14 Tf',
    '0.36 0.4 0.46 rg',
    '52 86 Td',
    '(Date) Tj',
    '0 -28 Td',
    '/F2 24 Tf',
    '0.13 0.15 0.2 rg',
    `(${safeDate}) Tj`,
    'ET',
    'BT',
    '/F3 24 Tf', // Reduced font size from 36 to 24
    '0.11 0.15 0.22 rg',
    '585 86 Td', // Slightly adjusted vertical position
    `(${escapePdfText(signature)}) Tj`,
    '0 -22 Td', // Adjusted line height for smaller font
    '/F1 10 Tf', // Slightly reduced role font size
    '0.36 0.4 0.46 rg',
    `(${escapePdfText(signatureRole)}) Tj`,
    'ET'
  ].join('\n');

  const objects = [
    '1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj',
    '2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj',
    '3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 842 595] /Resources << /Font << /F1 4 0 R /F2 5 0 R /F3 6 0 R >> >> /Contents 7 0 R >> endobj',
    '4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj',
    '5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Times-Bold >> endobj',
    '6 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Times-Italic >> endobj',
    `7 0 obj << /Length ${content.length} >> stream\n${content}\nendstream endobj`
  ];

  let pdf = '%PDF-1.4\n';
  const offsets = [0];
  objects.forEach((object) => {
    offsets.push(pdf.length);
    pdf += `${object}\n`;
  });

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += '0000000000 65535 f \n';
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
  });
  pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return new Blob([pdf], { type: 'application/pdf' });
}

export function downloadCoursePdf(course) {
  const sections = [
    `Category: ${course.category || 'General'}`,
    `Instructor: ${course.instructor_name || 'Unknown'}`,
    course.description || 'No course description available.',
    ...(course.modules || []).flatMap((moduleItem, moduleIndex) => [
      '',
      `Module ${moduleIndex + 1}: ${moduleItem.module_name}`,
      ...(moduleItem.lessons || []).map((lesson, lessonIndex) => `  Lesson ${lessonIndex + 1}: ${lesson.lesson_name}`)
    ])
  ];

  triggerDownload(`${course.title || 'course'}-overview.pdf`, buildPdfBlob(course.title || 'Course Overview', sections));
}

export function downloadModulePdf(course, moduleItem) {
  const sections = [
    `Course: ${course?.title || 'Course'}`,
    `Module: ${moduleItem?.module_name || 'Module'}`,
    ...(moduleItem?.lessons || []).flatMap((lesson, index) => [
      '',
      `Lesson ${index + 1}: ${lesson.lesson_name}`,
      lesson.content || 'No detailed content available.'
    ])
  ];

  triggerDownload(`${moduleItem?.module_name || 'module'}-resources.pdf`, buildPdfBlob(moduleItem?.module_name || 'Module Resources', sections));
}

export function downloadCertificatePdf({ learnerName, courseTitle, completedDate }) {
  triggerDownload(
    `${courseTitle || 'course'}-certificate.pdf`,
    buildStyledCertificatePdfBlob({ learnerName, courseTitle, completedDate })
  );
}

function triggerDownload(filename, blob) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}