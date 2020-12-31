import React, { useState } from 'react';
import UserSetupStep1 from '../UserSetupStep1';
import UserSetupStep2 from '../UserSetupStep2';
import UserSetupStep3 from '../UserSetupStep3';
import UserSetupStep4 from '../UserSetupStep4';
import UserSetupStep5 from '../UserSetupStep5';
import UserSetupComplete from '../UserSetupComplete';
import './UserSetupForm.css';
import { BASE_URL } from '../config';
import { Redirect, useHistory } from 'react-router-dom';

function UserSetupForm() {
  const INITIAL_USER_VALUES = { first_name: "", last_name: "", isParent: true, family_id: "", family_name: "" };
  const [hasFamilyId, setHasFamilyId] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_USER_VALUES);

  const history = useHistory();

  const handleChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = evt.currentTarget;
    setFormData(currData => ({ ...currData, [name]: value }));
  }

  const handleIsParentChange = (value: boolean) => {
    setFormData(currData => ({ ...currData, isParent: value }));
    console.log("submitting to backend to update the user info...", formData);
    // submit to the backend endpoint.
    next();
  }

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    console.log("submitting to backend to create/add family info....", formData);
    console.log("the cookie", document.cookie);

    const token = getCookie("x-access-token")

    try {
      if (!hasFamilyId) {
        const newFamResp = await fetch(`${BASE_URL}/create-family`, {
          method: 'POST',
          headers: {
            "Content-type": "application/json",
            "x-access-token": `${token}`,
          },
          body: JSON.stringify({ family_name: formData.family_name }),
          credentials: "include"
        });

        if (newFamResp.status !== 201) {
          console.log("failed to create family");
        } 
      }


      const resp = await fetch(`${BASE_URL}/update-user`, {
        method: 'PATCH',
        body: JSON.stringify(formData),
        headers: {
          "Content-type": "application/json",
          "x-access-token": `${token}`,
        },
        credentials: 'include',
      });
      if (resp.status === 200) {
        next();
      } else {
        alert("failed to update user information.")
      }
    } catch (err) {
      alert(`error:${err}`);
    }
  }

  function getCookie(name: String) {
    const value = `; ${document.cookie}`;
    const parts: Array<any> = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  const handleRedirect = () => {
    history.push("/tribe/overview");
  }

  const next = () => {
    setCurrentStep(currentStep + 1);
  }

  const prev = () => {
    setCurrentStep(currentStep - 1);
  }

  return (
    <div className="UserSetupForm" id="UserSetupForm">
      <UserSetupStep1 value={formData.first_name} handleChange={handleChange} next={next} currentStep={currentStep} />
      <UserSetupStep2 value={formData.last_name} handleChange={handleChange} next={next} prev={prev} currentStep={currentStep} />
      <UserSetupStep3 value={formData.isParent} handleIsParentChange={handleIsParentChange} next={next} prev={prev} currentStep={currentStep} />
      <UserSetupStep4 setHasFamilyId={setHasFamilyId} next={next} currentStep={currentStep} />
      <UserSetupStep5 isParent={formData.isParent} famIdValue={formData.family_id} famNameValue={formData.family_name} hasFamilyId={hasFamilyId} handleChange={handleChange} handleSubmit={handleSubmit} next={next} prev={prev} currentStep={currentStep} />
      <UserSetupComplete currentStep={currentStep} handleRedirect={handleRedirect} />
    </div>
  );
}

export default UserSetupForm;