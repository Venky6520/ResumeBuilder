import React, { useState, useEffect } from 'react';
import { apiUrl } from '../../services/ApplicantAPIService';
import { useUserContext } from '../common/UserProvider';
import MyResumeComponent from './MyResumeComponent';
import EditAndDownloadComponent from './EditAndDownloadComponent';

const ApplicantResume = () => {
  const [loading, setLoading] = useState(true);
  const [showBanner, setShowBanner] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const user = useUserContext().user;
 
  useEffect(() => {
    fetchApplicantDetails();
  }, []);
 
  const fetchApplicantDetails = async () => {
    try {
      const jwtToken = localStorage.getItem('jwtToken');
    
      const response = await fetch(`${apiUrl}/applicant/getApplicantById/${user.id}`, {

        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setShowBanner(data.localResume);
        fetchResumeContent();
      } else {
        console.error('Error fetching applicant details:', response);
      }
    } catch (error) {
      console.error('Error fetching applicant details:', error);
    }
  };
 
  // const fetchResumeContent = async () => {
  //   try {
  //     const jwtToken = localStorage.getItem('jwtToken');
  //     // const response = await fetch(`${apiUrl}/resume/pdf/${user.id}`, {
  //       // const userData = JSON.parse(localStorage.getItem("user"));
  //       // const applicantId = userData?.id;
  
  //           const response = await fetch(`${apiUrl}/resume-builder/getResume/${user.id}`, {
  //       headers: {
  //         Authorization: `Bearer ${jwtToken}`,
  //       },
  //     });
      
  //     if (response.ok) {
  //       const blob = await response.blob();
  //       const url = URL.createObjectURL(blob);
        

  //       setPdfUrl(url);
  //       setLoading(false);
  //       setShowBanner(false);

        
  //     } else {
  //       console.error('Error fetching resume content:', response);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching resume content:', error);
  //   }
  // };
 

  const fetchResumeContent = async () => {
    try {
      const jwtToken = localStorage.getItem('jwtToken');
      const response = await fetch(`${apiUrl}/resume/pdf/${user.id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
  
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        
        setPdfUrl(url);
        setLoading(false);
        setShowBanner(false);
      } else {
        console.error('Error fetching resume content:', response);
        setLoading(false); // Prevent infinite loading state
        setShowBanner(true); // Show "Create Resume" UI when API fails
      }
    } catch (error) {
      console.error('Error fetching resume content:', error);
      setLoading(false);
      // setShowBanner(true); // Show "Create Resume" UI in case of an error
    }
  };
  
  return (
    <div className="dashboard__content">
    <section className="page-title-dashboard">
      <div className="themes-container">
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="title-dashboard">
              <div className="title-dash">My Resume</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div className="col-lg-12 col-md-12">
              <section className="flat-dashboard-setting flat-dashboard-setting2">
                <div className="themes-container">
                  <div className="content-tab">
                    <div className="inner">
                      <div className="group-col-2"></div>
      {showBanner ? (
        <MyResumeComponent loading={loading} />
      ) : (
        <EditAndDownloadComponent pdfUrl={pdfUrl} loading={loading} />
      )}
    </div>
    </div>
    </div>
    </section>
    </div>
    </div>
  );
};
 
export default ApplicantResume;
