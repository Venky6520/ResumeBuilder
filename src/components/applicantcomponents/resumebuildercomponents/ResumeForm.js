

import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useUserContext } from "../../common/UserProvider";
import ResumeTemplateQueue from "./ResumeTemplateQueue";
import { apiUrl } from "../../../services/ApplicantAPIService";
const ResumeForm = ({ data, onChange }) => {
  const [resumeData, setResumeData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const user = useUserContext()?.user;

  useEffect(() => {
    if (user?.id) {
      fetchResumeData();
    }
  }, [user?.id]); // Depend only on `user?.id`

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
      setResumeData(data.resumePersonalInfo || {});
    } catch (error) {
      console.error("Error fetching resume data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      const response = await fetch(`${apiUrl}/resume-builder/updateResume/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(resumeData),
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      await response.json();
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating resume:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!resumeData) return <p>No resume data found.</p>;

  // const { user } = useUserContext();
    const applicantId = user.id;
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
  
 
  
  //   try {
  //     // Retrieve user data from localStorage (or state)
  //     const userData = JSON.parse(localStorage.getItem("user")); // Ensure user data is stored
  //     const jwtToken = userData?.data?.jwt;
  //     const userId = userData?.id;
  
  //     if (!jwtToken || !userId) {
  //       console.error("User is not authenticated");
  //       return;
  //     }
  
  //     // Extract experiences dynamically from the form state
  //     const experiences = data.experience;
  
  //     // Send API request
  //     const response = await fetch(`http://192.168.86.29:8081/experience/saveExperiences/${userId}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": `Bearer ${jwtToken}`, // Add JWT token
  //       },
  //       body: JSON.stringify(experiences),
  //     });
  
  //     const result = await response.json();
  //     console.log(result); // Should log: "All experiences saved successfully"
  //   } catch (error) {
  //     console.error("Error saving experiences:", error);
  //   }
  // };
  
  
  
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

  
  // const savePersonalInfo = async () => {
  //   const { personalInfo } = data;

  //   const payload = {
  //     fullName: personalInfo.name,
  //     email: personalInfo.email,
  //     phoneNo: personalInfo.phone,
  //     address: personalInfo.location,
  //     linkedin: personalInfo.linkedin,
  //     github: personalInfo.github,
  //     website: personalInfo.website,
  //     role: personalInfo.title,
  //     summary: personalInfo.summary,
  //   };

  //   try {
  //     const jwtToken = localStorage.getItem('jwtToken');
  //     const response = await fetch(
  //       `http://192.168.86.29:8082/personalInfo/savePersonalInfo/${applicantId}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${jwtToken}`,
  //         },
  //         body: JSON.stringify(payload),
  //       }
  //     );

  //     if (response.ok) {
  //       alert("Personal information saved successfully!");
  //     } else {
  //       const errorData = await response.json();
  //       alert(`Failed to save personal information: ${errorData.message}`);
  //     }
  //   } catch (error) {
  //     console.error("Error saving personal information:", error);
  //     alert("An error occurred while saving personal information.");
  //   }
  // };

  const saveResume = async () => {
    try {
      // Retrieve user data from localStorage
      const userData = JSON.parse(localStorage.getItem("user"));
      const jwtToken = userData?.data?.jwt;
      const applicantId = userData?.id;
  
      if (!jwtToken || !applicantId) {
        console.error("User is not authenticated");
        return;
      }
  
      // Construct the full resume payload
      const resumeData = {
        resumePersonalInfo: {
          fullName: data.personalInfo.name,
          email: data.personalInfo.email,
          phoneNo: data.personalInfo.phone,
          address: data.personalInfo.location,
          summary: data.personalInfo.summary,
          role: data.personalInfo.title,
        },
        resumeSkills: {
          technicalSkills: data.skills,
        },
        resumeExperiences: data.experience.map((exp) => ({
          company: exp.company,
          jobTitle: exp.jobTitle,
          startDate: exp.startDate,
          endDate: exp.endDate,
          description: exp.description,
        })),
        resumeEducations: data.education.map((edu) => ({
          college: edu.university,
          startYear: edu.graduationDate,
          endYear: edu.graduationDate, // Assuming same year for now
          cgpa: edu.percentage,
          standard: edu.degree,
        })),
        resumeProjects: data.projects.map((proj) => ({
          title: proj.title,
          description: proj.description,
          technologies: proj.technologies.split(","),
          startDate: proj.startDate,
          endDate: proj.endDate,
          link: proj.link,
        })),
        resumeCertificates: data.certifications.map((cert) => ({
          title: cert.name,
          issuedBy: cert.issuingOrganization,
          year: cert.issueDate,
        })),
        resumeLanguages: data.languages.map((lang) => ({
          languageName: lang,
        })),
        resumeIntrest:{
          intrests:data.interests
        }
     
       
      };
  
      // Send API request
      const response = await fetch(`http://192.168.86.29:8081/resume-builder/saveresume/${applicantId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(resumeData),
      });
  
      if (response.ok) {
        alert("Resume saved successfully!");
      } else {
        const errorData = await response.json();
        alert(`Failed to save resume: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error saving resume:", error);
      alert("An error occurred while saving the resume.");
    }
  };
  
  return (
    <div className="container row py-4">
      {/* Personal Information */}
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
        value={data.personalInfo.name  || resumeData.fullName}
        onChange={(e) => updatePersonalInfo("name", e.target.value)}
      />
    </div>
    <div className="col-md-6">
      <label className="form-label">Professional Title</label>
      <input
        type="text"
        className="form-control"
        placeholder="Professional Title"
        value={data.personalInfo.title|| resumeData.role}
        onChange={(e) => updatePersonalInfo("title", e.target.value)}
      />
    </div>
    <div className="col-md-6">
      <label className="form-label">Email</label>
      <input
        type="email"
        className="form-control"
        placeholder="Email"
        value={data.personalInfo.email|| resumeData.email}
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
  {/* <button
          type="button"
          className="btn btn-success mt-3"
          onClick={savePersonalInfo}
        >
          Save Personal Information
        </button> */}
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
  value={exp.jobTitle} // Change from `position` to `jobTitle`
  onChange={(e) => {
    const newExperience = [...data.experience];
    newExperience[index].jobTitle = e.target.value; // Update field name
    onChange({ ...data, experience: newExperience });
  }}
/>
            </div>
            <div className="mb-3">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                className="form-control"
                placeholder="e.g. Jan 2020"
                value={exp.startDate}
                onChange={(e) => {
                  const newExperience = [...data.experience];
                  newExperience[index].startDate = e.target.value;
                  onChange({ ...data, experience: newExperience });
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">End Date</label>
              <input
                type="date"
                className="form-control"
                placeholder="e.g. Jan 2020"
                value={exp.endDate}
                onChange={(e) => {
                  const newExperience = [...data.experience];
                  newExperience[index].endDate = e.target.value;
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
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                placeholder="Describe your work experience"
                rows="3"
                value={exp.description}
                onChange={(e) => {
                  const newExperience = [...data.experience];
                  newExperience[index].description = e.target.value;
                  onChange({ ...data, experience: newExperience });
                }}              />
            </div>
            {/* <button className="btn btn-success mt-3" onClick={saveExperiences}>
  Save Experiences
</button> */}

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
              <label className="form-label">Graduation Start Date</label>
              <input
                type="date"
                className="form-control"
                placeholder="e.g., May 2024"
                value={edu.graduationStartDate}
                onChange={(e) => updateEducation(index, 'graduationStartDate', e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Graduation End Date</label>
              <input
                type="date"
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
      <div className="mb-3">
        <label className="form-label">Start Date</label>
        <input
          type="date"
          className="form-control"
          value={project.startDate}
          onChange={(e) => updateProject(index, 'startDate', e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">End Date</label>
        <input
          type="date"
          className="form-control"
          value={project.endDate}
          onChange={(e) => updateProject(index, 'endDate', e.target.value)}
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


      {/* interest */}
 
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
         <button className="btn btn-success mt-3" onClick= {saveResume }>
  Save resume
</button>
      </div>
      
      {/* Add more sections like Education, Skills, etc., following the same pattern */}
    </div>

  );
};

export default ResumeForm;



// import { useState, useEffect } from "react";

// const ResumeForm = ({ applicantId }) => {
//   const apiUrl = "your_api_base_url"; // Replace with your actual API URL

//   // State for form data
//   const [resumeData, setResumeData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     experience: "",
//     education: "",
//   });

//   // State to control edit mode
//   const [isEditing, setIsEditing] = useState(false);

//   // Fetch resume data when the component loads
//   useEffect(() => {
//     fetch(`${apiUrl}/resume-builder/saveresume/${applicantId}`)
//       .then((response) => response.json())
//       .then((data) => {
//         if (data) {
//           setResumeData(data); // Populate form with API data
//         }
//       })
//       .catch((error) => console.error("Error fetching resume:", error));
//   }, [applicantId]);

//   // Handle input changes
//   const handleChange = (e) => {
//     setResumeData({ ...resumeData, [e.target.name]: e.target.value });
//   };

//   // Save updated data (PUT request)
//   const handleSave = () => {
//     fetch(`${apiUrl}/resume-builder/saveresume/${applicantId}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(resumeData),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Resume updated:", data);
//         setIsEditing(false); // Switch back to view mode
//       })
//       .catch((error) => console.error("Error updating resume:", error));
//   };

//   return (
//     <div>
//       <h2>Resume Form</h2>

//       <form>
//         <label>Full Name:</label>
//         <input
//           type="text"
//           name="fullName"
//           value={resumeData.fullName }
//           onChange={handleChange}
//           readOnly={!isEditing}
//         />

//         <label>Email:</label>
//         <input
//           type="email"
//           name="email"
//           value={resumeData.email}
//           onChange={handleChange}
//           readOnly={!isEditing}
//         />

//         <label>Phone:</label>
//         <input
//           type="tel"
//           name="phone"
//           value={resumeData.phone}
//           onChange={handleChange}
//           readOnly={!isEditing}
//         />

//         <label>Experience:</label>
//         <input
//           type="text"
//           name="experience"
//           value={resumeData.experience}
//           onChange={handleChange}
//           readOnly={!isEditing}
//         />

//         <label>Education:</label>
//         <input
//           type="text"
//           name="education"
//           value={resumeData.education}
//           onChange={handleChange}
//           readOnly={!isEditing}
//         />
//       </form>

//       {/* Toggle between Edit and Save mode */}
//       {isEditing ? (
//         <button onClick={handleSave}>Save</button>
//       ) : (
//         <button onClick={() => setIsEditing(true)}>Edit</button>
//       )}
//     </div>
//   );
// };

// export default ResumeForm;



// import React, { useState, useEffect } from "react";
// import { apiUrl } from "../../../services/ApplicantAPIService";
// import { useUserContext } from "../../../components/common/UserProvider";

// const ResumeForm = () => {
//   const [resumeData, setResumeData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
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
//       setResumeData(data.resumePersonalInfo || {});
//     } catch (error) {
//       console.error("Error fetching resume data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setResumeData({ ...resumeData, [e.target.name]: e.target.value });
//   };

//   const handleSave = async () => {
//     try {
//       const jwtToken = localStorage.getItem("jwtToken");
//       const response = await fetch(`${apiUrl}/resume-builder/updateResume/${user.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${jwtToken}`,
//         },
//         body: JSON.stringify(resumeData),
//       });
//       if (!response.ok) throw new Error(`Error: ${response.status}`);
//       await response.json();
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Error updating resume:", error);
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (!resumeData) return <p>No resume data found.</p>;

//   return (
//     <div>
//       <h2>Resume Form</h2>
//       <form>
//         <label>Full Name:</label>
//         <input type="text" name="fullName" value={resumeData.fullName || ""} onChange={handleChange} />
        
//         <label>Email:</label>
//         <input type="email" name="email" value={resumeData.email || ""} onChange={handleChange} />

//         <label>Phone:</label>
//         <input type="tel" name="phoneNo" value={resumeData.phoneNo || ""} onChange={handleChange}  />

//         <label>Address:</label>
//         <input type="text" name="address" value={resumeData.address || ""} onChange={handleChange} />

//         <label>LinkedIn:</label>
//         <input type="text" name="linkedin" value={resumeData.linkedin || ""} onChange={handleChange}  />
//         <label>Title:</label>
//         <input type="text" name="linkedin" value={resumeData.role || ""} onChange={handleChange}  />
//       </form>

//       {isEditing ? (
//         <button onClick={handleSave}>Save</button>
//       ) : (
//         <button onClick={() => setIsEditing(true)}>Edit</button>
//       )}
//     </div>
//   );
// };

// export default ResumeForm;

