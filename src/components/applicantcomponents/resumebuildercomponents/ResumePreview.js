import React, {useState, useEffect} from 'react';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { apiUrl } from '../../../services/ApplicantAPIService';
import { useUserContext } from "../../common/UserProvider";

export const ResumePreview = ({ data }) => {

  const [loading, setLoading] = useState(true);
const [resumeData, setResumeData] = useState({});

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
      setResumeData({
        ...(data.resumePersonalInfo || {}), // Spread personal info
        experiences: data.resumeExperiences || [], // Ensure experiences is always an array
        educations: data.resumeEducations || [],
        projects: data.resumeProjects || [],
        certifications: data.resumeCertificates || [],
        languages: data.resumeLanguages || [],
        interests: data.resumeIntrests || [],
        skills: data.resumeSkills || [],
        
       
      });
     
    console.log('Full Name:', data.resumePersonalInfo.email || 'No fullname found');
      console.log(data.resumeExperiences);
      console.log(data.resumeExperiences[0].company);


    } catch (error) {
      console.error("Error fetching resume data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumeData();
  }, []);
  return (
    <div id="resume-preview" style={{ backgroundColor: '#fff', padding: '20px', color: '#000', fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="display-4 text-dark">{data.personalInfo.name|| resumeData.fullName}</h1>
        <p className="h5 text-secondary mt-2">{data.personalInfo.title || resumeData.role}</p>
        <div className="d-flex justify-content-center gap-3 mt-3 text-secondary">
         
            <div className="d-flex align-items-center gap-1">
              <FiMail size={16} />
             {data.personalInfo.email ||resumeData.email}
            </div>
          
       
            <div className="d-flex align-items-center gap-1">
              <FiPhone size={16} />
              <span>{data.personalInfo.phone|| resumeData.phoneNo}</span>
            </div>
         
          
            <div className="d-flex align-items-center gap-1">
              <FiMapPin size={16} />
              <span>{data.personalInfo.location|| resumeData.address}</span>
            </div>
          
        </div>
      </div>

      {/* Summary */}
    
        <div className={sectionClass}>
          <h2 className="h4 text-dark mb-3">Professional Summary</h2>
          <p className="text-dark">{data.personalInfo.summary||resumeData.summary}</p>
        </div>
   



        <div className={sectionClass}>
          <h3 className="h4 text-dark mb-3">LinkedIn</h3>
          <p className="text-dark">{data.personalInfo.linkedin || resumeData.linkedin}</p>
        </div>
    
        <div className={sectionClass}>
          <h3 className="h4 text-dark mb-3">Github</h3>
          <p className="text-dark">{data.personalInfo.github || resumeData.github}</p>
        </div>
    
  
        <div className={sectionClass}>
          <h3 className="h4 text-dark mb-3">Website</h3>
          <p className="text-dark">{data.personalInfo.website || resumeData.website}</p>
        </div>
        
      {/* Experience */}
      {data.experience.length > 0 && (
        <div className={sectionClass}>
          <h2 className="h4 text-dark mb-3">Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="d-flex justify-content-between align-items-baseline">
                <h3 className="h5 text-dark">{exp.position||resumeData.experiences?.[index]?.jobTitle || ''}</h3>
                <p className="text-secondary">
                  {exp.startDate||resumeData.experiences?.[index]?.startDate || ''} - {exp.endDate||resumeData.experiences?.[index]?.endDate || ''}
                </p>

              </div>
              <p className="text-dark fw-bold">{exp.company ||resumeData.experiences?.[index]?.company || ''}              </p>
              <p className="text-secondary mt-2">{exp.description||resumeData.experiences?.[index]?.company || ''}</p>
              <p className="text-secondary mt-2">{exp.duration ||resumeData.experiences?.[index]?.duration || ''}</p>
              <p className="text-secondary mt-2">{exp.description ||resumeData.experiences?.[index]?.description || ''}</p>



            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className={sectionClass}>
          <h2 className="h4 text-dark mb-3">Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="d-flex justify-content-between align-items-baseline">
                {/* <h3 className="h5 text-dark">
                  {edu.degree|| resumeData.educations[index]?.college|| ""}
                <br/>
                <br/>
                {edu.standard ||resumeData.educations?.[index]?.standard|| ''}
                </h3> */}
         
                <p className="h5 text-dark"></p>

                
                <div className=' row'>
                {/* <p className="text-secondary">{edu.graduationStartDate  ||resumeData.educations[index]?.startYear}</p> */}
                {/* <p className="text-secondary">{edu.graduationDate  ||resumeData.educations[index]?.endYear}</p>

                <p className="text-secondary">{edu.percentage   ||resumeData.educations[index]?.cgpa}</p> */}
                </div>

              </div>
              <p className="text-dark fw-bold">{edu.school}</p>
              <p className="text-dark fw-bold">{edu.university}</p>
              <p className="text-secondary mt-2">{edu.fieldOfStudy}</p>

              <p className="text-secondary mt-2">{edu.description}</p>
            </div>
          ))}
        </div>
      )}

    

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className={sectionClass}>
          <h2 className="h4 text-dark mb-3">Skills</h2>
          <div className="d-flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="badge bg-light text-dark"
              >
                {skill ||resumeData.skills?.[index].technicalSkills|| ''}
              </span>
            ))}
          </div>
        </div>
      )}

        {/* Projects */}
        {data.projects.length > 0 && (
  <div className={sectionClass}>
    <h2 className="h4 text-dark mb-3">Projects</h2>
    {data.projects.map((project, index) => (
      <div key={index} className="mb-4">
        <h3 className="h5 text-dark">{project.title||resumeData.projects?.[index].title|| ''}</h3>
        <p className="text-secondary">{project.description ||resumeData.projects?.[index].description|| ''}</p>
        <p className="text-dark"><strong>Technologies:</strong> {project.technologies ||resumeData.projects?.[index].technologies|| ''}</p>
        <p className="text-dark"><strong>startDate:</strong>{project.startDate ||resumeData.projects?.[index].startDate|| ''}</p>
        <p className="text-dark"><strong>EndDate:</strong>  {project.endDate ||resumeData.projects?.[index].endDate|| ''}</p>

          <p className="text-dark">
            <strong>Link:</strong> <a href={project.link} target="_blank" rel="noopener noreferrer">{project.link ||resumeData.projects?.[index].link|| ''}</a>
          </p>
      </div>
    ))}
  </div>
)}

      {/* Certifications */}

{data.certifications.length > 0 && (
  <div className={sectionClass}>
    <h2 className="h4 text-dark mb-3">Certifications</h2>
    {data.certifications.map((cert, index) => (
      <div key={index} className="mb-4">
        <h3 className="h5 text-dark">{cert.name||resumeData.certifications?.[index].title|| ''}</h3>
        <p className="text-dark"><strong>Issuing Organization:</strong> {cert.issuingOrganization||resumeData.certifications?.[index].issuedBy|| ''}</p>
        <p className="text-secondary">
          <strong>Issued:</strong> {cert.issueDate}
          {cert.expirationDate && <> | <strong>Issued Date:</strong> {cert.expirationDate||resumeData.certifications?.[index].year|| ''}</>}
        </p>
        {cert.credentialID && (
          <p className="text-dark"><strong>Credential ID:</strong> {cert.credentialID}</p>
        )}
        {cert.credentialURL && (
          <p className="text-dark">
            <strong>Credential URL:</strong> <a href={cert.credentialURL} target="_blank" rel="noopener noreferrer">{cert.credentialURL}</a>
          </p>
        )}
      </div>
    ))}
  </div>
)}


      {/* Languages */}
      {data.languages?.length > 0 && (
        <div className={sectionClass}>
          <h2 className="h4 text-dark mb-3">Languages</h2>
          <div className="d-flex flex-wrap gap-2">
            {data.languages.map((language, index) => (
              <span
                key={index}
                className="badge bg-light text-dark"
              >
                {language||resumeData.languages?.[index].languageName|| ''}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Interests */}
        <div className={sectionClass}>
          <h2 className="h4 text-dark mb-3">Interests</h2>
          <div className="d-flex flex-wrap gap-2">
            {data.interests.map((interest, index) => (
              <span
                key={index}
                className="badge bg-light text-dark"
              >
                {interest ||resumeData.interests?.[index].intrest|| ''}
              </span>
            ))}
          </div>
          
        </div>

      {/* Custom Sections */}
      {data.customSections?.map((section, index) => (
        <div key={index} className={sectionClass}>
          <h2 className="h4 text-dark mb-3">{section.title}</h2>
          <p className="text-dark">{section.content}</p>
        </div>
      ))}
    </div>
  );
};


export default ResumePreview;

// import React, { useState, useEffect } from 'react';
// import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
// import { apiUrl } from '../../../services/ApplicantAPIService';
// import { useUserContext } from "../../common/UserProvider";

// export const ResumePreview = ({ data }) => {
//   const [loading, setLoading] = useState(true);
//   const [resumeData, setResumeData] = useState({});
//   const user = useUserContext()?.user;

//   // Function to fetch resume data
//   const fetchResumeData = async () => {
//     if (!user?.id) return;

//     setLoading(true);
//     try {
//       const jwtToken = localStorage.getItem("jwtToken");
//       const response = await fetch(`${apiUrl}/resume-builder/getResume/${user.id}`, {
//         headers: { Authorization: `Bearer ${jwtToken}` },
//       });

//       if (!response.ok) throw new Error(`Error: ${response.status}`);

//       const data = await response.json();
//       setResumeData({
//         ...(data.resumePersonalInfo || {}), // Spread personal info
//         experiences: data.resumeExperiences || [],
//         educations: data.resumeEducations || [],
//         projects: data.resumeProjects || [],
//         certifications: data.resumeCertificates || [],
//         languages: data.resumeLanguages || [],
//         interests: data.resumeInterests || [],
//         skills: data.resumeTechnicalSkills || [],
//       });

//     } catch (error) {
//       console.error("Error fetching resume data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch resume data on component mount
//   useEffect(() => {
//     fetchResumeData();
//   }, []);

//   const getSectionStyle = () => {
//     const style = data.style?.sectionStyle || 'line';
//     switch (style) {
//       case 'box':
//         return 'border border-2 p-4 rounded';
//       case 'underline':
//         return 'border-bottom border-2 pb-2 mb-4';
//       case 'line':
//       default:
//         return 'border-top border-2 pt-2 mt-4';
//     }
//   };

//   const primaryColor = data.style?.primaryColor || '#3B82F6';
//   const sectionClass = `${getSectionStyle()} mb-4`;

//   return (
//     <div id="resume-preview" className="bg-white p-4 shadow h-100 " style={{ color: primaryColor }}>
//       {/* Header */}
//       <div className="text-center mb-4">
//         <h1 className="display-4 text-dark">
//           {resumeData.fullname || data.personalInfo?.name}
//         </h1>
//         <p className="h5 text-secondary mt-2">{resumeData.title || data.personalInfo?.title}</p>
//         <div className="d-flex justify-content-center gap-3 mt-3 text-secondary">
//           {(resumeData.email || data.personalInfo?.email) && (
//             <div className="d-flex align-items-center gap-1">
//               <FiMail size={16} />
//               <span>{resumeData.email || data.personalInfo?.email}</span>
//             </div>
//           )}
//           {(resumeData.phone || data.personalInfo?.phone) && (
//             <div className="d-flex align-items-center gap-1">
//               <FiPhone size={16} />
//               <span>{resumeData.phone || data.personalInfo?.phone}</span>
//             </div>
//           )}
//           {(resumeData.location || data.personalInfo?.location) && (
//             <div className="d-flex align-items-center gap-1">
//               <FiMapPin size={16} />
//               <span>{resumeData.location || data.personalInfo?.location}</span>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Summary */}
//       {(resumeData.summary || data.personalInfo?.summary) && (
//         <div className={sectionClass}>
//           <h2 className="h4 text-dark mb-3">Professional Summary</h2>
//           <p className="text-dark">{resumeData.summary || data.personalInfo?.summary}</p>
//         </div>
//       )}

//       {/* Experience */}
//       {(resumeData.experiences?.length > 0 || data.experience?.length > 0) && (
//         <div className={sectionClass}>
//           <h2 className="h4 text-dark mb-3">Experience</h2>
//           {(resumeData.experiences || data.experience).map((exp, index) => (
//             <div key={index} className="mb-4">
//               <h3 className="h5 text-dark">{exp.position}</h3>
//               <p className="text-secondary">{exp.company}</p>
//               <p className="text-secondary">{exp.startDate} - {exp.endDate}</p>
//               <p className="text-secondary mt-2">{exp.description}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Education */}
//       {(resumeData.educations?.length > 0 || data.education?.length > 0) && (
//         <div className={sectionClass}>
//           <h2 className="h4 text-dark mb-3">Education</h2>
//           {(resumeData.educations || data.education).map((edu, index) => (
//             <div key={index} className="mb-4">
//               <h3 className="h5 text-dark">{edu.degree}</h3>
//               <p className="text-dark fw-bold">{edu.school}</p>
//               <p className="text-dark fw-bold">{edu.university}</p>
//               <p className="text-secondary">{edu.fieldOfStudy}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Skills */}
//       {(resumeData.skills?.length > 0 || data.skills?.length > 0) && (
//         <div className={sectionClass}>
//           <h2 className="h4 text-dark mb-3">Skills</h2>
//           <div className="d-flex flex-wrap gap-2">
//             {(resumeData.skills.technicalSkillName || data.skills).map((skill, index) => (
//               <span key={index} className="badge bg-light text-dark">
//                 {skill}
//               </span>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Projects */}
//       {(resumeData.projects?.length > 0 || data.projects?.length > 0) && (
//         <div className={sectionClass}>
//           <h2 className="h4 text-dark mb-3">Projects</h2>
//           {(resumeData.projects || data.projects).map((project, index) => (
//             <div key={index} className="mb-4">
//               <h3 className="h5 text-dark">{project.title}</h3>
//               <p className="text-secondary">{project.description}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Certifications */}
//       {(resumeData.certifications?.length > 0 || data.certifications?.length > 0) && (
//         <div className={sectionClass}>
//           <h2 className="h4 text-dark mb-3">Certifications</h2>
//           {(resumeData.certifications || data.certifications).map((cert, index) => (
//             <div key={index} className="mb-4">
//               <h3 className="h5 text-dark">{cert.name}</h3>
//               <p className="text-dark"><strong>Issuer:</strong> {cert.issuingOrganization}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ResumePreview;


// import React, { useState, useEffect } from "react";
// import { FiMail, FiPhone, FiMapPin, FiGlobe, FiLinkedin } from "react-icons/fi";
// import { apiUrl } from "../../../services/ApplicantAPIService";
// import { useUserContext } from "../../../components/common/UserProvider";

// const ResumePreview = () => {
//   const [resumeData, setResumeData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const user = useUserContext()?.user;

//   useEffect(() => {
//     if (user?.id) {
//       fetchResumeData();
//     }
//   }, [user]);

//   const fetchResumeData = async () => {
//     try {
//       if (!user?.id) {
//         console.warn("User ID is missing. Skipping API call.");
//         return;
//       }

//       setLoading(true);
//       const jwtToken = localStorage.getItem("jwtToken");

//       const response = await fetch(`${apiUrl}/resume-builder/getResume/${user.id}`, {
//         headers: { Authorization: `Bearer ${jwtToken}` },
//       });

//       if (!response.ok) {
//         throw new Error(`Error fetching resume data: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("API Response Data:", data);

//       if (!data || !data.resumePersonalInfo) {
//         console.warn("Resume data or resumePersonalInfo is missing:", data);
//         return;
//       }

//       setResumeData(data);
//     } catch (error) {
//       console.error("Error fetching resume data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (!resumeData || !resumeData.resumePersonalInfo) return <p>No resume data found.</p>;

//   // Extracting properties from resumePersonalInfo
//   const {
//     fullName,
//     email,
//     phoneNo,
//     address,
//     linkedin,
//     github,
//     website,
//     role,
//     summary,
//   } = resumeData.resumePersonalInfo || {};

//   const primaryColor = resumeData.style?.primaryColor || "#3B82F6";

//   return (
//     <div id="resume-preview" className="bg-white p-4 shadow h-100" style={{ color: primaryColor }}>
//       {/* Header Section */}
//       <div className="text-center mb-4">
//         <h1 className="display-4 text-dark">{fullName || "N/A"}</h1>
//         <p className="h5 text-secondary mt-2">{role || "N/A"}</p>
//         <div className="d-flex justify-content-center gap-3 mt-3 text-secondary">
//           {email && <InfoItem icon={<FiMail />} text={email} />}
//           {phoneNo && <InfoItem icon={<FiPhone />} text={phoneNo} />}
//           {address && <InfoItem icon={<FiMapPin />} text={address} />}
//           {linkedin && <InfoItem icon={<FiLinkedin />} text={linkedin} />}
//           {github && <InfoItem icon={<FiGlobe />} text={github} />}
//           {website && <InfoItem icon={<FiGlobe />} text={website} />}
//         </div>
//       </div>

//       {/* Summary Section */}
//       {summary && <Section title="Professional Summary" content={summary} />}

//       {/* Technical Skills Section */}
//       {resumeData.resumeTechnicalSkills?.length > 0 && (
//         <Section title="Technical Skills">
//           <ul>
//             {resumeData.resumeTechnicalSkills.map((skill, index) => (
//               <li key={index}>{skill.name || "N/A"}</li>
//             ))}
//           </ul>
//         </Section>
//       )}

//       {/* Experience Section */}
//       {resumeData.resumeExperiences?.length > 0 && (
//         <Section title="Work Experience">
//           {resumeData.resumeExperiences.map((exp, index) => (
//             <div key={index} className="mb-2">
//               <h5>{exp.companyName} - {exp.role}</h5>
//               <p className="text-muted">{exp.startDate} - {exp.endDate || "Present"}</p>
//               <p>{exp.description}</p>
//             </div>
//           ))}
//         </Section>
//       )}

//       {/* Education Section */}
//       {resumeData.resumeEducations?.length > 0 && (
//         <Section title="Education">
//           {resumeData.resumeEducations.map((edu, index) => (
//             <div key={index} className="mb-2">
//               <h5>{edu.degree} - {edu.institution}</h5>
//               <p className="text-muted">{edu.year}</p>
//             </div>
//           ))}
//         </Section>
//       )}

//       {/* Certifications Section */}
//       {resumeData.resumeCertificates?.length > 0 && (
//         <Section title="Certifications">
//           {resumeData.resumeCertificates.map((cert, index) => (
//             <div key={index} className="mb-2">
//               <h5>{cert.title} - {cert.issuedBy}</h5>
//               <p className="text-muted">{cert.year}</p>
//             </div>
//           ))}
//         </Section>
//       )}

//       {/* Projects Section */}
//       {resumeData.resumeProjects?.length > 0 && (
//         <Section title="Projects">
//           {resumeData.resumeProjects.map((project, index) => (
//             <div key={index} className="mb-2">
//               <h5>{project.title}</h5>
//               <p>{project.description}</p>
//             </div>
//           ))}
//         </Section>
//       )}

//       {/* Interests Section */}
//       {resumeData.resumeIntrests?.length > 0 && (
//         <Section title="Interests">
//           <ul>
//             {resumeData.resumeIntrests.map((interest, index) => (
//               <li key={index}>{interest.name}</li>
//             ))}
//           </ul>
//         </Section>
//       )}

//       {/* Languages Section */}
//       {resumeData.resumeLanguages?.length > 0 && (
//         <Section title="Languages">
//           <ul>
//             {resumeData.resumeLanguages.map((lang, index) => (
//               <li key={index}>{lang.name} ({lang.level})</li>
//             ))}
//           </ul>
//         </Section>
//       )}

//       {/* Refresh Button */}
//       <button onClick={fetchResumeData} className="btn btn-primary mt-3">
//         Refresh Resume
//       </button>
//     </div>
//   );
// };

// // Info Item Component (Reusable)
// const InfoItem = ({ icon, text }) => (
//   <div className="d-flex align-items-center gap-1">
//     {icon}
//     <span>{text}</span>
//   </div>
// );

// // Section Component (Reusable)
// const Section = ({ title, content, children }) => (
//   <div className="border-top border-2 pt-2 mt-4 mb-4">
//     <h2 className="h4 text-dark mb-3">{title}</h2>
//     {content ? <p className="text-dark">{content}</p> : children}
//   </div>
// );

// export default ResumePreview;



// import React, { useState, useEffect } from "react";
// import { FiMail, FiPhone, FiMapPin, FiGlobe, FiLinkedin } from "react-icons/fi";
// import { apiUrl } from "../../../services/ApplicantAPIService";
// import { useUserContext } from "../../../components/common/UserProvider";

// const ResumePreview = () => {
//   const [resumeData, setResumeData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const user = useUserContext()?.user;

//   useEffect(() => {
//     if (user?.id) {
//       fetchResumeData();
//     }
//   }, [user]);

//   const fetchResumeData = async () => {
//     try {
//       if (!user?.id) return;
//       setLoading(true);
//       const jwtToken = localStorage.getItem("jwtToken");
//       const response = await fetch(`${apiUrl}/resume-builder/getResume/${user.id}`, {
//         headers: { Authorization: `Bearer ${jwtToken}` },
//       });
//       if (!response.ok) throw new Error(`Error: ${response.status}`);
//       const data = await response.json();
//       setResumeData(data);
//     } catch (error) {
//       console.error("Error fetching resume data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (!resumeData?.resumePersonalInfo) return <p>No resume data found.</p>;

//   const { fullName, email, phoneNo, address, linkedin, github, website, role, summary } = resumeData.resumePersonalInfo;
//   const primaryColor = resumeData.style?.primaryColor || "#3B82F6";

//   return (
//     <div id="resume-preview" className="bg-white p-4 shadow h-100" style={{ color: primaryColor }}>
//       {/* Header */}
//       <div className="text-center mb-4">
//         <h1 className="display-4 text-dark">{fullName || "N/A"}</h1>
//         <p className="h5 text-secondary mt-2">{role || "N/A"}</p>
//         <div className="d-flex justify-content-center gap-3 mt-3 text-secondary">
//           {email && <InfoItem icon={<FiMail />} text={email} />}
//           {phoneNo && <InfoItem icon={<FiPhone />} text={phoneNo} />}
//           {address && <InfoItem icon={<FiMapPin />} text={address} />}
//           {linkedin && <InfoItem icon={<FiLinkedin />} text={linkedin} />}
//           {github && <InfoItem icon={<FiGlobe />} text={github} />}
//           {website && <InfoItem icon={<FiGlobe />} text={website} />}
//         </div>
//       </div>

//       {summary && <Section title="Professional Summary" content={summary} />}

//       {resumeData.resumeTechnicalSkills?.length > 0 && (
//         <Section title="Technical Skills">
//           <ul>
//             {resumeData.resumeTechnicalSkills.map((skill, index) => (
//               <li key={index}>{skill.technicalSkillName}</li>
//             ))}
//           </ul>
//         </Section>
//       )}

//       {resumeData.resumeExperiences?.length > 0 && (
//         <Section title="Work Experience">
//           {resumeData.resumeExperiences.map((exp, index) => (
//             <div key={index} className="mb-2">
//               <h5>{exp.company} - {exp.jobTitle}</h5>
//               <p className="text-muted">{exp.startDate} - {exp.endDate || "Present"}</p>
//               <p>{exp.description}</p>
//             </div>
//           ))}
//         </Section>
//       )}

//       {resumeData.resumeEducations?.length > 0 && (
//         <Section title="Education">
//           {resumeData.resumeEducations.map((edu, index) => (
//             <div key={index} className="mb-2">
//               <h5>{edu.standard} - {edu.college}</h5>
//               <p className="text-muted">{edu.startYear} - {edu.endYear}</p>
//             </div>
//           ))}
//         </Section>
//       )}

//       {resumeData.resumeCertificates?.length > 0 && (
//         <Section title="Certifications">
//           {resumeData.resumeCertificates.map((cert, index) => (
//             <div key={index} className="mb-2">
//               <h5>{cert.title} - {cert.issuedBy}</h5>
//               <p className="text-muted">{cert.year}</p>
//             </div>
//           ))}
//         </Section>
//       )}

//       {resumeData.resumeProjects?.length > 0 && (
//         <Section title="Projects">
//           {resumeData.resumeProjects.map((project, index) => (
//             <div key={index} className="mb-2">
//               <h5>{project.title}</h5>
//               <p>{project.description}</p>
//               <p className="text-muted">{project.startDate} - {project.endDate}</p>
//               <a href={project.link}>{project.link}</a>
//             </div>
//           ))}
//         </Section>
//       )}

//       {resumeData.resumeIntrests?.length > 0 && (
//         <Section title="Interests">
//           <ul>
//             {resumeData.resumeIntrests.map((interest, index) => (
//               <li key={index}>{interest.intrest}</li>
//             ))}
//           </ul>
//         </Section>
//       )}

//       {resumeData.resumeLanguages?.length > 0 && (
//         <Section title="Languages">
//           <ul>
//             {resumeData.resumeLanguages.map((lang, index) => (
//               <li key={index}>{lang.languageName}</li>
//             ))}
//           </ul>
//         </Section>
//       )}

//       <button onClick={fetchResumeData} className="btn btn-primary mt-3">
//         Refresh Resume
//       </button>
//     </div>
//   );
// };

// const InfoItem = ({ icon, text }) => (
//   <div className="d-flex align-items-center gap-1">
//     {icon}
//     <span>{text}</span>
//   </div>
// );

// const Section = ({ title, content, children }) => (
//   <div className="border-top border-2 pt-2 mt-4 mb-4">
//     <h2 className="h4 text-dark mb-3">{title}</h2>
//     {content ? <p className="text-dark">{content}</p> : children}
//   </div>
// );

// export default ResumePreview;
