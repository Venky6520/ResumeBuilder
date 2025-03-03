// import React, { useState } from 'react';
// import ResumeForm from './ResumeForm';
// import ResumePreview from './ResumePreview';
// import html2pdf from 'html2pdf.js';
// import logos from '../../../images/logofinal.png';

// const initialResumeData = {
//   personalInfo: {
//     name: '',
//     title: '',
//     email: '',
//     phone: '',
//     location: '',
//     summary: ''
//   },
//   experience: [],
//   education: [],
//   skills: [],
//   projects: [],
//   certifications: [],
//   languages: [],
//   interests: [],

//   customSections: [],
//   style: {
//     primaryColor: '#3B82F6',
//     fontFamily: 'Inter, sans-serif',
//     sectionStyle: 'line' // 'line', 'box', 'underline'
//   }
// };

// function ResumeLayout() {
//   const [resumeData, setResumeData] = useState(initialResumeData);

// //     const element = document.getElementById('resume-preview');
// //     const opt = {
// //       margin: 1,
// //       filename: `${resumeData.personalInfo.name.toLowerCase().replace(/\s+/g, '_')}_resume.pdf`,
// //       image: { type: 'jpeg', quality: 0.98 },
// //       html2canvas: { scale: 2 },
// //       jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
// //     };

// //     html2pdf().set(opt).from(element).save();
// //   };


// const downloadPDF = () => {
//     const element = document.getElementById('resume-preview');
//     const opt = {
//       margin: 1,
//       filename: `${resumeData.personalInfo.name.toLowerCase().replace(/\s+/g, '_')}_resume.pdf`,
//       image: { type: 'jpeg', quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
//     };
  
//     html2pdf().set(opt).from(element).save();
//   };
  

//   return (
  

//   <div className="min-vh-100 bg-light">
//   {/* Header */}
//   <header className="bg-white shadow-sm py-3">
//     <div className="container d-flex justify-content-between align-items-center">
//       <div className="d-flex align-items-center gap-2">
//       <div id="logo" className="logo">
//                     <a href="/applicanthome">
//                       <img
//                         className="site-logo"
                       
//                         src={logos}
//                         alt="Image"
//                       />
//                     </a>
                    
//                   </div>   
//                      </div>
//       <button
//         onClick={downloadPDF}
//         className="btn btn-primary ms-auto d-flex align-items-center gap-2"
//       >
//         Download PDF
//       </button>
//     </div>
//   </header>

//   {/* Main Content */}
//   <main className="container py-4">
//     <div className="row justify-content-center">
//       {/* Left Column - Form */}
//       <div className="col-lg-5 mb-3">
//         <div className="bg-white rounded-lg p-3 shadow-sm">
//           <ResumeForm data={resumeData} onChange={setResumeData} />
//         </div>
//       </div>

//       {/* Right Column - Preview */}
//       <div className="col-lg-5 mb-3">
//         <div className="bg-white rounded-lg p-3 shadow-sm">
//           <ResumePreview data={resumeData} />
//         </div>
//       </div>
//     </div>
//   </main>
// </div>
// );
// }

// export default ResumeLayout;




// import React, { useState } from 'react';
// import ResumeForm from './ResumeForm';
// import ResumePreview from './ResumePreview';
// import html2pdf from 'html2pdf.js';
// import logos from '../../../images/logofinal.png';

// const initialResumeData = {
//   personalInfo: {
//     name: '',
//     title: '',
//     email: '',
//     phone: '',
//     location: '',
//     summary: ''
//   },
//   experience: [],
//   education: [],
//   skills: [],
//   projects: [],
//   certifications: [],
//   languages: [],
//   interests: [],
//   customSections: [],
//   style: {
//     primaryColor: '#3B82F6',
//     fontFamily: 'Inter, sans-serif',
//     sectionStyle: 'line' // 'line', 'box', 'underline'
//   }
// };

// function ResumeLayout() {
//   const [resumeData, setResumeData] = useState(initialResumeData);

//   const downloadPDF = () => {
//     const element = document.getElementById('resume-preview');
//     const opt = {
//       margin: 1,
//       filename: `${resumeData.personalInfo.name.toLowerCase().replace(/\s+/g, '_')}_resume.pdf`,
//       image: { type: 'jpeg', quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
//     };
//     html2pdf().set(opt).from(element).save();
//   };

//   return (
//     <div className="min-vh-100 bg-light">
//       {/* Header */}
//       <header className="bg-white shadow-sm py-3">
//         <div className="container d-flex justify-content-between align-items-center">
//           <div className="d-flex align-items-center gap-2">
//             <div id="logo" className="logo">
//               <a href="/applicanthome">
//                 <img className="site-logo" src={logos} alt="Logo" />
//               </a>
//             </div>
//           </div>
//           <button
//             onClick={downloadPDF}
//             className="btn btn-primary ms-auto d-flex align-items-center gap-2"
//           >
//             Download PDF
//           </button>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className=" py-4">
//         <div className="row justify-content-center align-items-start">
//           {/* Left Column - Form */}
//           <div className="col-lg-6 mb-3">
//             <div className="bg-white rounded-lg p-3 shadow-sm h-100">
//               <ResumeForm data={resumeData} onChange={setResumeData} />
//             </div>
//           </div>

//           {/* Right Column - Preview */}
//           {/* <div className="col-lg-6 mb-3">
//             <div className="bg-white rounded-lg p-3 shadow-sm h-100">
//               <ResumePreview data={resumeData} />
//             </div>
//           </div> */}

          
//         </div>
//       </main>
//     </div>
//   );
// }

// export default ResumeLayout;



import React, { useState } from 'react';
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';
import html2pdf from "html2pdf.js";
import axios from "axios";
import logos from '../../../images/logofinal.png';
import { useNavigate } from "react-router-dom";

import { Toast, ToastContainer } from "react-bootstrap";

const initialResumeData = {
  personalInfo: {
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    summary: ''
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  interests: [],
  customSections: [],
  style: {
    primaryColor: '#3B82F6',
    fontFamily: 'Inter, sans-serif',
    sectionStyle: 'line' // 'line', 'box', 'underline'
  }
};

function ResumeLayout() {
  const [resumeData, setResumeData] = useState(initialResumeData);
  const navigate = useNavigate(); // Use navigation for redirecting
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success"); // success or danger


  const handleSaveOrUpload = async () => {
    try {
      console.log("Resume Data:", resumeData);

      if (!resumeData || !resumeData.personalInfo || !resumeData.personalInfo.name) {
        setToastMessage("Please fill in your personal details before saving.");
        setToastVariant("danger");
        setShowToast(true);
        return;
      }

      const fileName = `${resumeData.personalInfo.name.toLowerCase().replace(/\s+/g, "_")}_resume.pdf`;

      // Convert Resume Preview to PDF for Upload (without downloading)
      const element = document.getElementById("resume-preview");
      const pdfBlob = await html2pdf().from(element).outputPdf("blob");

      // Upload PDF to Backend
      const formData = new FormData();
      const pdfFile = new File([pdfBlob], fileName, { type: "application/pdf" });
      console.log(fileName)
formData.append("file", pdfFile);


const response = await fetch("http://localhost:8081/upload", {
  method: "POST",
  body: formData,
});
const result = await response.json();
console.log(result);

      if (response.status === 200) {
        setToastMessage("Resume uploaded successfully!");
        setToastVariant("success");
        setShowToast(true);

        // const uploadedFileUrl = response.data.fileUrl; // Get uploaded PDF URL
        // navigate("/applicanthome", { state: { uploadedFileUrl } });
      }
    } catch (error) {
      console.error("Error processing resume:", error);
      setToastMessage("Failed to upload resume.");
      setToastVariant("danger");
      setShowToast(true);
    }
  }
  
  const handleDownloadPDF = async () => {
    if (!resumeData || !resumeData.personalInfo || !resumeData.personalInfo.name) {
      alert({ message: "Please fill in your personal details before downloading.", type: "danger" });
      return;
    }
  
    const fileName = `${resumeData.personalInfo.name.toLowerCase().replace(/\s+/g, "_")}_resume.pdf`;
  
    const element = document.getElementById("resume-preview");
    const opt = {
      margin: 1,
      filename: fileName,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    
    await html2pdf().set(opt).from(element).save();
  };
  
  
  // const downloadPDF = () => {
  //   const element = document.getElementById('resume-preview');
  //   const opt = {
  //     margin: 1,
  //     filename: `${resumeData.personalInfo.name.toLowerCase().replace(/\s+/g, '_')}_resume.pdf`,
  //     image: { type: 'jpeg', quality: 0.98 },
  //     html2canvas: { scale: 2 },
  //     jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  //   };
  //   html2pdf().set(opt).from(element).save();
  // };

  return (
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <header className="bg-white shadow-sm py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <div id="logo" className="logo">
              <a href="/applicanthome">
                <img className="site-logo" src={logos} alt="Logo" />
              </a>
            </div>
          </div>
          <div className="d-flex gap-2">
  <button onClick={handleSaveOrUpload} className="btn btn-primary">
     Save & Upload
  </button>

      {/* Snackbar Notification at Bottom-Right */}
      <ToastContainer
        position="bottom-end"
        className="p-3"
        style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1050 }}
      >
        <Toast bg={toastVariant} show={showToast} onClose={() => setShowToast(false)} delay={2000} autohide>
          <Toast.Body className="text-white text-center">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
  <button onClick={ handleDownloadPDF} className="btn btn-primary">
    Download PDF
  </button>
</div>

        </div>
      </header>

      {/* Main Content */}
      <main className="py-4">
        <div className="row justify-content-center align-items-start">
          {/* Left Column - Form */}
          <div className="col-lg-6 mb-3">
            <div
              className="bg-white rounded-lg p-3 shadow-sm h-100 overflow-auto"
              style={{ maxHeight: '80vh' }}
            >
              <ResumeForm data={resumeData} onChange={setResumeData} />
            </div>
          </div>

          {/* Right Column - Preview */}
          <div className="col-lg-6 mb-3">
            <div className="bg-white rounded-lg p-3 shadow-sm h-100 overflow-auto"
              style={{ maxHeight: '80vh' }}
            >
              <ResumePreview data={resumeData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ResumeLayout;
