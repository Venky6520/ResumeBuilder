


import React, { useState, useEffect, useCallback } from 'react';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { apiUrl } from '../../../services/ApplicantAPIService';
import { useUserContext } from "../../common/UserProvider";
import "./ResumePreview.css"
export const ResumePreview = ({ data  }) => {
  const [loading, setLoading] = useState(true);
  const [resumeData, setResumeData] = useState({
    resumePersonalInfo: {
      fullName: "",
      email: "",
      phoneNo: "",
      address: "",
      summary: "",
      role: "",
    },
    resumeSkills: { technicalSkills: [] },
    resumeExperiences: [],
    resumeEducations: [],
    resumeProjects: [],
    resumeCertificates: [],
    resumeLanguages: [
      { languageName: "" }
    ],    resumeIntrest: { intrests: [] },
  });

  const user = useUserContext()?.user;

  const getSectionStyle = () => {
    const style = data.style?.sectionStyle || 'line';
    switch (style) {
      case 'box':
        return 'border border-2 p-4 rounded';
      case 'underline':
        return 'border-bottom border-2 pb-2 mb-4';
      case 'line':
      default:
        return 'border-top border-2 pt-2 mt-4';
    }
  };

  const primaryColor = data.style?.primaryColor || '#3B82F6';
  const sectionClass = `${getSectionStyle()} mb-4`;

  const fetchResumeData = async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      const response = await fetch(`${apiUrl}/resume-builder/getResume/${user.id}`, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();
      setResumeData((prev) => ({
        ...prev,
        ...data,
      }));
      console.log('Resume Data:', data);
    } catch (error) {
      console.error("Error fetching resume data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumeData();
  }, []);
  useEffect(() => {
    if (data) {
      setResumeData(data); // Set entire `data` to `resumeData`
    }
  }, [data]); // Depend only on `data`
  

  useEffect(() => {
    console.log("Updated data:", data);

  }, [data]);


  useEffect(() => {
    if (data?.resumePersonalInfo?.fullName || data?.resumeExperiences?.length > 0) {
      setResumeData((prev) => ({
        ...prev,
        resumePersonalInfo: {
          ...prev.resumePersonalInfo,
          fullName: data.resumePersonalInfo.fullName,
          role: data.resumePersonalInfo.role,
          email: data.resumePersonalInfo.email,
          phoneNo: data.resumePersonalInfo.phoneNo,
          address: data.resumePersonalInfo.address,
          summary: data.resumePersonalInfo.summary,
          linkedin: data.resumePersonalInfo.linkedin,
          github: data.resumePersonalInfo.github,
          website: data.resumePersonalInfo.website,
        },
        resumeExperiences: data.resumeExperiences?.map((exp) => ({
          jobTitle: exp.jobTitle || "",
          company: exp.company || "",
          startDate: exp.startDate || "",
          endDate: exp.endDate || "Present",
          description: exp.description || "",
        })) || [],
        resumeEducations: data.resumeEducations?.map((edu) => ({
          cgpa: edu.cgpa || "",
          standard: edu.standard || "",
          startYear: edu.startYear || "",
          endYear: edu.endYear || "Present",
          college: edu.college || "",
        })) || [],
     


        resumeProjects: data.resumeProjects?.map((project) => ({
          title: project.title || "",
          description: project.description || "",
          startDate: project.startDate || "",
          endDate: project.endDate || "Present",
          link: project.link || "",
        })) || [],

        resumeCertificates: data.resumeCertificates?.map((certificate) => ({
          title: certificate.title || "",
          issuedBy: certificate.issuedBy || "",
          year: certificate.year || "",
        })) || [],
        resumeSkills: {
          technicalSkills: data.resumeSkills?.technicalSkills?.map(skill => 
            skill || "" // Extracts the skill name, ensuring it's a string
          ) || []
        },
        

        resumeLanguages: data.resumeLanguages?.map(lang => 
          ({ languageName: lang.languageName || "" }) // Ensures correct structure for each language
        ) || [],
        
        
        
        resumeIntrest: {
          intrests: data?.resumeIntrest?.intrests?.map((interest) => interest) || [],
        },
      }));
    }
  }, [data]);

  return (

<div id="resume-preview" className="bg-white p-4 shadow h-100" style={{ color: primaryColor }}>
  <div className="page-section">
    <div className="text-center mb-4">
      {resumeData?.resumePersonalInfo?.fullName || data?.resumePersonalInfo?.fullName ? (
        <h1 className="display-4 text-dark">
          {resumeData?.resumePersonalInfo?.fullName || data?.resumePersonalInfo?.fullName}
        </h1>
      ) : null}

      {resumeData?.resumePersonalInfo?.role || data?.resumePersonalInfo?.role ? (
        <p className="h5 text-secondary mt-2">
          {resumeData?.resumePersonalInfo?.role || data?.resumePersonalInfo?.role}
        </p>
      ) : null}

      <div className="d-flex justify-content-center gap-3 mt-3 text-secondary">
        {resumeData?.resumePersonalInfo?.email && (
          <div className="d-flex align-items-center gap-1">
            <FiMail size={16} />
            <span>{resumeData.resumePersonalInfo.email}</span>
          </div>
        )}
        {resumeData?.resumePersonalInfo?.phoneNo && (
          <div className="d-flex align-items-center gap-1">
            <FiPhone size={16} />
            <span>{resumeData.resumePersonalInfo.phoneNo}</span>
          </div>
        )}
        {resumeData?.resumePersonalInfo?.address && (
          <div className="d-flex align-items-center gap-1">
            <FiMapPin size={16} />
            <span>{resumeData.resumePersonalInfo.address}</span>
          </div>
        )}
      </div>

      <div className="d-flex align-items-center gap-3 p-2">
        {resumeData?.resumePersonalInfo?.linkedin && (
          <p className="h6 text-dark">{resumeData.resumePersonalInfo.linkedin}</p>
        )}
        {resumeData?.resumePersonalInfo?.github && (
          <p className="h6 text-dark">{resumeData.resumePersonalInfo.github}</p>
        )}
        {resumeData?.resumePersonalInfo?.website && (
          <p className="h6 text-dark">{resumeData.resumePersonalInfo.website}</p>
        )}
      </div>

      {resumeData?.resumePersonalInfo?.summary && (
        <div className={sectionClass}>
          <h3 className="h4 text-dark">Summary</h3>
          <p>{resumeData.resumePersonalInfo.summary}</p>
        </div>
      )}
    </div>

    {/* Experience Section */}
    {resumeData?.resumeExperiences?.length > 0 && (
      <div className={sectionClass}>
        {resumeData.resumeExperiences.map((experience, index) => (
          
          <div key={index} className="mb-3">
           {experience.company &&          <h3 className="h4 text-dark">Experience</h3>}

            {experience.jobTitle && <h3 className="h5">Position: {experience.jobTitle}</h3>}
            {experience.company && <p className="text-secondary">Company: {experience.company}</p>}
            {experience.startDate && experience.endDate && (
              <p>Start Date: {experience.startDate} - End Date: {experience.endDate}</p>
            )}
            {experience.description && <p>Description: {experience.description}</p>}
          </div>
        ))}
      </div>
    )}

    {/* <div className="page-break"></div> Page Break */}

    {/* Education Section */}
    {resumeData.resumeEducations?.length > 0 && (
      <div className={sectionClass}>
        {resumeData.resumeEducations.map((education, index) => (
          
          <div key={index} className="mb-3">
                 {education.college &&   <h3 className="h4 text-dark">Education</h3>}

            {education.college && <h3 className="h5">College: {education.college}</h3>}
            {education.standard && <p className="text-secondary">Field of Study: {education.standard}</p>}
            {education.startYear && education.endYear && (
              <p>Duration: {education.startYear} - {education.endYear}</p>
            )}
            {education.cgpa && <p> {education.cgpa}</p>}
          </div>
        ))}
      </div>
    )}
  {/* </div> */}

  {/* <div className="page-break"></div> Page Break */}

  {/* Second Page Content */}
  {/* <div className="page-section"> */}
    {resumeData?.resumeSkills?.technicalSkills?.length > 0 && (
      <div className={sectionClass}>
        <h3 className="h4 text-dark">Technical Skills</h3>
        <ul>
          {resumeData.resumeSkills.technicalSkills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
    )}

    {resumeData.resumeProjects?.length > 0 && (
      <div className={sectionClass}>
        {resumeData.resumeProjects.map((project, index) => (
          <div key={index} className="mb-3">
             {project.title   &&     <h3 className="h4 text-dark">Projects</h3>}

            {project.title && <h3 className="h5">Title: {project.title}</h3>}
            {project.description && <p>Description: {project.description}</p>}
            {project.startDate && project.endDate && (
              <p>Duration: {project.startDate} - {project.endDate}</p>
            )}
            {project.link && <p>Project Link: {project.link}</p>}
          </div>
        ))}
      </div>
    )}

      {/* <div className="page-break"></div> */}


    {resumeData.resumeCertificates?.length > 0 && (
      <div className={sectionClass}>
        {resumeData.resumeCertificates.map((certificate, index) => (
          <div key={index} className="mb-3">
             {certificate.title &&        <h3 className="h4 text-dark">Certificates</h3>}

            {certificate.title && <h3 className="h5">Title: {certificate.title}</h3>}
            {certificate.issuedBy && <p className="text-secondary">Issued by: {certificate.issuedBy}</p>}
            {certificate.year && <p>Date of Issue: {certificate.year}</p>}
          </div>
        ))}
      </div>
    )}

    

 

{resumeData?.resumeLanguages?.some(lang => lang.languageName.trim() !== "") && (
  <div className={sectionClass}>
    <h3 className="h4 text-dark">Languages</h3>
    <ul>
      {resumeData.resumeLanguages.map((language, index) =>
        language.languageName.trim() !== "" ? (
          <li key={index}>{language.languageName}</li>
        ) : null
      )}
    </ul>
  </div>
)}



{resumeData?.resumeIntrest?.intrests?.some(interest => interest.trim() !== "") && (
  <div className={sectionClass}>
    <h3 className="h4 text-dark">Interests</h3>
    <ul>
      {resumeData.resumeIntrest.intrests.map((interest, index) =>
        interest.trim() !== "" ? <li key={index}>{interest}</li> : null
      )}
    </ul>
  </div>
)}
</div>
  </div>


  );
};


export default ResumePreview


