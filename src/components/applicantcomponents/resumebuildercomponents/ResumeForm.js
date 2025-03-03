// import React from 'react';
// import { FaPlus, FaTrash } from 'react-icons/fa';

//  const ResumeForm = ({ data, onChange }) => {
//   const updatePersonalInfo = (field, value) => {
//     onChange({
//       ...data,
//       personalInfo: {
//         ...data.personalInfo,
//         [field]: value,
//       },
//     });
//   };

//   return (
//     <div className="container row py-4">
//       <div className="mb-4">
//         <h2 className="h4">Personal Information</h2>
//         <div className="row g-3">
//           <div className="col-md-6">
//             <label className="form-label">Full Name</label>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Full Name"
//               value={data.personalInfo.name}
//               onChange={(e) => updatePersonalInfo('name', e.target.value)}
//             />
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Professional Title</label>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Professional Title"
//               value={data.personalInfo.title}
//               onChange={(e) => updatePersonalInfo('title', e.target.value)}
//             />
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Email</label>
//             <input
//               type="email"
//               className="form-control"
//               placeholder="Email"
//               value={data.personalInfo.email}
//               onChange={(e) => updatePersonalInfo('email', e.target.value)}
//             />
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Phone</label>
//             <input
//               type="tel"
//               className="form-control"
//               placeholder="Phone"
//               value={data.personalInfo.phone}
//               onChange={(e) => updatePersonalInfo('phone', e.target.value)}
//             />
//           </div>
//           <div className="col-md-12">
//             <label className="form-label">Location</label>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Location"
//               value={data.personalInfo.location}
//               onChange={(e) => updatePersonalInfo('location', e.target.value)}
//             />
//           </div>
//           <div className="col-md-12">
//             <label className="form-label">Professional Summary</label>
//             <textarea
//               className="form-control"
//               placeholder="Professional Summary"
//               rows="3"
//               value={data.personalInfo.summary}
//               onChange={(e) => updatePersonalInfo('summary', e.target.value)}
//             />
//           </div>
//         </div>
//       </div>
//       {/* Example of adding an experience section */}
//       <div className="mb-4">
//         <h2 className="h4">Experience</h2>
//         {data.experience.map((exp, index) => (
//           <div key={index} className="mb-3 border p-3 position-relative">
//             <button
//               type="button"
//               className="btn btn-danger position-absolute top-0 end-0 m-2"
//               onClick={() => {
//                 const newExperience = data.experience.filter((_, i) => i !== index);
//                 onChange({ ...data, experience: newExperience });
//               }}
//             >
//               <FaTrash />
//             </button>
//             <div className="mb-3">
//               <label className="form-label">Company</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Company"
//                 value={exp.company}
//                 onChange={(e) => {
//                   const newExperience = [...data.experience];
//                   newExperience[index].company = e.target.value;
//                   onChange({ ...data, experience: newExperience });
//                 }}
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Position</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Position"
//                 value={exp.position}
//                 onChange={(e) => {
//                   const newExperience = [...data.experience];
//                   newExperience[index].position = e.target.value;
//                   onChange({ ...data, experience: newExperience });
//                 }}
//               />
//             </div>
//             {/* Add more fields as needed */}
//           </div>
//         ))}
//         <button
//           type="button"
//           className="btn btn-primary"
//           onClick={() => {
//             const newExperience = [
//               ...data.experience,
//               { company: '', position: '' /* Add other fields as needed */ },
//             ];
//             onChange({ ...data, experience: newExperience });
//           }}
//         >
//           <FaPlus className="me-2" />
//           Add Experience
//         </button>
//       </div>
//       {/* Add more sections like Education, Skills, etc., following the same pattern */}
//     </div>
//   );
// };


// export default ResumeForm;

import React from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import ResumeTemplateQueue from "./ResumeTemplateQueue";


const ResumeForm = ({ data, onChange }) => {
  const updatePersonalInfo = (field, value) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value,
      },
    });
  };
   // Function to update education details
   const updateEducation = (index, field, value) => {
    const newEducation = [...data.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    onChange({ ...data, education: newEducation });
  };

  // Function to add a new education entry
  const addEducation = () => {
    const newEducation = [
      ...data.education,
      { university: '', degree: '', fieldOfStudy: '', graduationDate: '', percentage: '', description: '', school:'' },
    ];
    onChange({ ...data, education: newEducation });
  };

  // Function to remove an education entry
  const removeEducation = (index) => {
    const newEducation = data.education.filter((_, i) => i !== index);
    onChange({ ...data, education: newEducation });
  };
  // Function to update project details
const updateProject = (index, field, value) => {
  const newProjects = [...data.projects];
  newProjects[index] = { ...newProjects[index], [field]: value };
  onChange({ ...data, projects: newProjects });
};

// Function to add a new project entry
const addProject = () => {
  const newProjects = [
    ...data.projects,
    { title: '', description: '', technologies: '', link: '' },
  ];
  onChange({ ...data, projects: newProjects });
};

// Function to remove a project entry
const removeProject = (index) => {
  const newProjects = data.projects.filter((_, i) => i !== index);
  onChange({ ...data, projects: newProjects });
};

// Function to update certification details
const updateCertification = (index, field, value) => {
  const newCertifications = [...data.certifications];
  newCertifications[index] = { ...newCertifications[index], [field]: value };
  onChange({ ...data, certifications: newCertifications });
};

// Function to add a new certification entry
const addCertification = () => {
  const newCertifications = [
    ...data.certifications,
    { name: '', issuingOrganization: '', issueDate: '', expirationDate: '', credentialID: '', credentialURL: '' },
  ];
  onChange({ ...data, certifications: newCertifications });
};

// Function to remove a certification entry
const removeCertification = (index) => {
  const newCertifications = data.certifications.filter((_, i) => i !== index);
  onChange({ ...data, certifications: newCertifications });
};


const addSkill = () => {
  const newSkills = [...data.skills, ''];
  onChange({ ...data, skills: newSkills });
};

const removeSkill = (index) => {
  const newSkills = data.skills.filter((_, i) => i !== index);
  onChange({ ...data, skills: newSkills });
};
// lnaguage
const addLanguage = () => {
  const newLanguages = [...data.languages, '']; // Add an empty language
  onChange({ ...data, languages: newLanguages });
};

const updateLanguage = (index, value) => {
  const newLanguages = [...data.languages];
  newLanguages[index] = value;
  onChange({ ...data, languages: newLanguages });
};

const removeLanguage = (index) => {
  const newLanguages = data.languages.filter((_, i) => i !== index);
  onChange({ ...data, languages: newLanguages });
};

// intrest

const addInterest = () => {
  const newInterests = [...data.interests, '']; // Add an empty interest
  onChange({ ...data, interests: newInterests });
};

const updateInterest = (index, value) => {
  const newInterests = [...data.interests];
  newInterests[index] = value;
  onChange({ ...data, interests: newInterests });
};

const removeInterest = (index) => {
  const newInterests = data.interests.filter((_, i) => i !== index);
  onChange({ ...data, interests: newInterests });
};

  return (
    <div className="container row py-4">
      {/* Personal Information */}
      {/* <div className="mb-4">
        <h2 className="h4">Personal Information</h2>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Full Name"
              value={data.personalInfo.name}
              onChange={(e) => updatePersonalInfo("name", e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Professional Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Professional Title"
              value={data.personalInfo.title}
              onChange={(e) => updatePersonalInfo("title", e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={data.personalInfo.email}
              onChange={(e) => updatePersonalInfo("email", e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              className="form-control"
              placeholder="Phone"
              value={data.personalInfo.phone}
              onChange={(e) => updatePersonalInfo("phone", e.target.value)}
            />
          </div>
          <div className="col-md-12">
            <label className="form-label">Location</label>
            <input
              type="text"
              className="form-control"
              placeholder="Location"
              value={data.personalInfo.location}
              onChange={(e) => updatePersonalInfo("location", e.target.value)}
            />
          </div>
          <div className="col-md-12">
            <label className="form-label">Professional Summary</label>
            <textarea
              className="form-control"
              placeholder="Professional Summary"
              rows="3"
              value={data.personalInfo.summary}
              onChange={(e) => updatePersonalInfo("summary", e.target.value)}
            />
          </div>
        </div>
      </div> */}
<div className="mb-4">
  <h2 className="h4">Personal Information</h2>
  <div className="row g-3">
    {/* Existing Fields */}
    <div className="col-md-6">
      <label className="form-label">Full Name</label>
      <input
        type="text"
        className="form-control"
        placeholder="Full Name"
        value={data.personalInfo.name}
        onChange={(e) => updatePersonalInfo("name", e.target.value)}
      />
    </div>
    <div className="col-md-6">
      <label className="form-label">Professional Title</label>
      <input
        type="text"
        className="form-control"
        placeholder="Professional Title"
        value={data.personalInfo.title}
        onChange={(e) => updatePersonalInfo("title", e.target.value)}
      />
    </div>
    <div className="col-md-6">
      <label className="form-label">Email</label>
      <input
        type="email"
        className="form-control"
        placeholder="Email"
        value={data.personalInfo.email}
        onChange={(e) => updatePersonalInfo("email", e.target.value)}
      />
    </div>
    <div className="col-md-6">
      <label className="form-label">Phone</label>
      <input
        type="tel"
        className="form-control"
        placeholder="Phone"
        value={data.personalInfo.phone}
        onChange={(e) => updatePersonalInfo("phone", e.target.value)}
      />
    </div>
    <div className="col-md-12">
      <label className="form-label">Location</label>
      <input
        type="text"
        className="form-control"
        placeholder="Location"
        value={data.personalInfo.location}
        onChange={(e) => updatePersonalInfo("location", e.target.value)}
      />
    </div>
    <div className="col-md-12">
      <label className="form-label">Professional Summary</label>
      <textarea
        className="form-control"
        placeholder="Professional Summary"
        rows="3"
        value={data.personalInfo.summary}
        onChange={(e) => updatePersonalInfo("summary", e.target.value)}
      />
    </div>

    {/* New Fields */}
    <div className="col-md-6">
      <label className="form-label">LinkedIn Profile</label>
      <input
        type="url"
        className="form-control"
        placeholder="LinkedIn URL"
        value={data.personalInfo.linkedin}
        onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
      />
    </div>
    <div className="col-md-6">
      <label className="form-label">GitHub Profile</label>
      <input
        type="url"
        className="form-control"
        placeholder="GitHub URL"
        value={data.personalInfo.github}
        onChange={(e) => updatePersonalInfo("github", e.target.value)}
      />
    </div>
    <div className="col-md-12">
      <label className="form-label">Personal Website</label>
      <input
        type="url"
        className="form-control"
        placeholder="Website URL"
        value={data.personalInfo.website}
        onChange={(e) => updatePersonalInfo("website", e.target.value)}
      />
    </div>
  </div>
</div>

      {/* Experience Section */}
      <div className="mb-4">
        <h2 className="h4">Experience</h2>
        {data.experience.map((exp, index) => (
          <div key={index} className="mb-3 border p-3 position-relative">
            <button
              type="button"
              className="btn btn-danger position-absolute top-0 end-0 m-2"
              onClick={() => {
                const newExperience = data.experience.filter((_, i) => i !== index);
                onChange({ ...data, experience: newExperience });
              }}
            >
              <FaTrash />
            </button>
            <div className="mb-3">
              <label className="form-label">Company</label>
              <input
                type="text"
                className="form-control"
                placeholder="Company"
                value={exp.company}
                onChange={(e) => {
                  const newExperience = [...data.experience];
                  newExperience[index].company = e.target.value;
                  onChange({ ...data, experience: newExperience });
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Position</label>
              <input
                type="text"
                className="form-control"
                placeholder="Position"
                value={exp.position}
                onChange={(e) => {
                  const newExperience = [...data.experience];
                  newExperience[index].position = e.target.value;
                  onChange({ ...data, experience: newExperience });
                }}
              />
            </div>
            {/* Duration Field */}
            <div className="mb-3">
              <label className="form-label">Duration</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Jan 2020 - Dec 2023"
                value={exp.duration}
                onChange={(e) => {
                  const newExperience = [...data.experience];
                  newExperience[index].duration = e.target.value;
                  onChange({ ...data, experience: newExperience });
                }}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            const newExperience = [
              ...data.experience,
              { company: "", position: "", duration: "" },
            ];
            onChange({ ...data, experience: newExperience });
          }}
        >
          <FaPlus className="me-2" />
          Add Experience
        </button>
      </div>
      {/* Education Section */}
      {/* <div className="mb-4">
        <h2 className="h4">Education</h2>
        {data.education.map((edu, index) => (
          <div key={index} className="mb-3 border p-3 position-relative">
            <button
              type="button"
              className="btn btn-danger position-absolute top-0 end-0 m-2"
              onClick={() => removeEducation(index)}
            >
              <FaTrash />
            </button>
            <div className="mb-3">
              <label className="form-label">School</label>
              <input
                type="text"
                className="form-control"
                placeholder="School"
                value={edu.school}
                onChange={(e) => updateEducation(index, 'school', e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Degree</label>
              <input
                type="text"
                className="form-control"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => updateEducation(index, 'degree', e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Graduation Date</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. May 2024"
                value={edu.graduationDate}
                onChange={(e) => updateEducation(index, 'graduationDate', e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                placeholder="Describe your studies, achievements, or relevant coursework"
                rows="3"
                value={edu.description}
                onChange={(e) => updateEducation(index, 'description', e.target.value)}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-primary"
          onClick={addEducation}
        >
          <FaPlus className="me-2" />
          Add Education
        </button>
      </div> */}
      <div className="mb-4">
        <h2 className="h4">Education</h2>
        {data.education.map((edu, index) => (
          <div key={index} className="mb-3 border p-3 position-relative">
            <button
              type="button"
              className="btn btn-danger position-absolute top-0 end-0 m-2"
              onClick={() => removeEducation(index)}
            >
              <FaTrash />
            </button>
            <div className="mb-3">
              <label className="form-label">University</label>
              <input
                type="text"
                className="form-control"
                placeholder="University"
                value={edu.university}
                onChange={(e) => updateEducation(index, 'university', e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">College</label>
              <input
                type="text"
                className="form-control"
                placeholder="School"
                value={edu.school}
                onChange={(e) => updateEducation(index, 'school', e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Degree</label>
              <input
                type="text"
                className="form-control"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => updateEducation(index, 'degree', e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Field of Study</label>
              <input
                type="text"
                className="form-control"
                placeholder="Field of Study"
                value={edu.fieldOfStudy}
                onChange={(e) => updateEducation(index, 'fieldOfStudy', e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Graduation Date</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g., May 2024"
                value={edu.graduationDate}
                onChange={(e) => updateEducation(index, 'graduationDate', e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Percentage</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g., 85%"
                value={edu.percentage}
                onChange={(e) => updateEducation(index, 'percentage', e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                placeholder="Describe your studies, achievements, or relevant coursework"
                rows="3"
                value={edu.description}
                onChange={(e) => updateEducation(index, 'description', e.target.value)}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-primary"
          onClick={addEducation}
        >
          <FaPlus className="me-2" />
          Add Education
        </button>
      </div>
      <div className="mb-4">
        <h2 className="h4">Skills</h2>
        {data.skills.map((skill, index) => (
          <div key={index} className="mb-3 border p-3 position-relative">
            <button
              type="button"
              className="btn btn-danger position-absolute top-0 end-0 m-2"
              onClick={() => removeSkill(index)}
            >
              <FaTrash />
            </button>
            <div className="mb-3">
              <label className="form-label">Skill</label>
              <input
                type="text"
                className="form-control"
                placeholder="Skill"
                value={skill}
                onChange={(e) => {const newSkills = [...data.skills];
                  newSkills[index] = e.target.value;
                  onChange({ ...data, skills: newSkills });}}
              />  
            </div>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-primary"
          onClick={addSkill}
        >
          <FaPlus className="me-2" />
          Add Skill
        </button>
      </div>
      {/* languages */}
      <div className="mb-4">
        <h2 className="h4">Languages</h2>
        {data.languages.map((language, index) => (
          <div key={index} className="mb-3 border p-3 position-relative">
            <button
              type="button"
              className="btn btn-danger position-absolute top-0 end-0 m-2"
              onClick={() => removeLanguage(index)}
            >
              <FaTrash />
            </button>
            <div className="mb-3">
              <label className="form-label">Language</label>
              <input
                type="text"
                className="form-control"
                placeholder="Language"
                value={language}
                onChange={(e) => updateLanguage(index, e.target.value)}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-primary"
          onClick={addLanguage}
        >
          <FaPlus className="me-2" />
          Add Language
        </button>
      </div>
      
 
 
      {/* Projects Section */}
      <div className="mb-4">
  <h2 className="h4">Projects</h2>
  {data.projects.map((project, index) => (
    <div key={index} className="mb-3 border p-3 position-relative">
      <button
        type="button"
        className="btn btn-danger position-absolute top-0 end-0 m-2"
        onClick={() => removeProject(index)}
      >
        <FaTrash />
      </button>
      <div className="mb-3">
        <label className="form-label">Project Title</label>
        <input
          type="text"
          className="form-control"
          placeholder="Project Title"
          value={project.title}
          onChange={(e) => updateProject(index, 'title', e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          placeholder="Brief description of the project"
          rows="3"
          value={project.description}
          onChange={(e) => updateProject(index, 'description', e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Technologies Used</label>
        <input
          type="text"
          className="form-control"
          placeholder="e.g., React, Node.js, MongoDB"
          value={project.technologies}
          onChange={(e) => updateProject(index, 'technologies', e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Project Link</label>
        <input
          type="url"
          className="form-control"
          placeholder="URL to the project or repository"
          value={project.link}
          onChange={(e) => updateProject(index, 'link', e.target.value)}
        />
      </div>
    </div>
  ))}
  <button
    type="button"
    className="btn btn-primary"
    onClick={addProject}
  >
    <FaPlus className="me-2" />
    Add Project
  </button>
</div>

<div className="mb-4">
  <h2 className="h4">Certifications</h2>
  {data.certifications.map((cert, index) => (
    <div key={index} className="mb-3 border p-3 position-relative">
      <button
        type="button"
        className="btn btn-danger position-absolute top-0 end-0 m-2"
        onClick={() => removeCertification(index)}
      >
        <FaTrash />
      </button>
      <div className="mb-3">
        <label className="form-label">Certification Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Certification Name"
          value={cert.name}
          onChange={(e) => updateCertification(index, 'name', e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Issuing Organization</label>
        <input
          type="text"
          className="form-control"
          placeholder="Issuing Organization"
          value={cert.issuingOrganization}
          onChange={(e) => updateCertification(index, 'issuingOrganization', e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Issue Date</label>
        <input
          type="date"
          className="form-control"
          value={cert.issueDate}
          onChange={(e) => updateCertification(index, 'issueDate', e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Expiration Date</label>
        <input
          type="date"
          className="form-control"
          value={cert.expirationDate}
          onChange={(e) => updateCertification(index, 'expirationDate', e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Credential ID</label>
        <input
          type="text"
          className="form-control"
          placeholder="Credential ID"
          value={cert.credentialID}
          onChange={(e) => updateCertification(index, 'credentialID', e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Credential URL</label>
        <input
          type="url"
          className="form-control"
          placeholder="Credential URL"
          value={cert.credentialURL}
          onChange={(e) => updateCertification(index, 'credentialURL', e.target.value)}
        />
      </div>
    </div>
  ))}
  <button
    type="button"
    className="btn btn-primary"
    onClick={addCertification}
  >
    <FaPlus className="me-2" />
    Add Certification
  </button>
</div>


      {/* intrest */}
 
      <div className="mb-4">
        <h2 className="h4">Interests</h2>
        {data.interests.map((interest, index) => (
          <div key={index} className="mb-3 border p-3 position-relative">
            <button
              type="button"
              className="btn btn-danger position-absolute top-0 end-0 m-2"
              onClick={() => removeInterest(index)}
            >
              <FaTrash />
            </button>
            <div className="mb-3">
              <label className="form-label">Interest</label>
              <input
                type="text"
                className="form-control"
                placeholder="Interest"
                value={interest}
                onChange={(e) => updateInterest(index, e.target.value)}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-primary"
          onClick={addInterest}
        >
          <FaPlus className="me-2" />
          Add Interest
        </button>
        <h6 className="mt-2">Choose Template</h6>
        <ResumeTemplateQueue/>
      
        
      </div>
      
      {/* Add more sections like Education, Skills, etc., following the same pattern */}
    </div>

  );
};

export default ResumeForm;
