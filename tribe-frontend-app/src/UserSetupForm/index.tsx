import React, { useEffect, useState } from 'react';
import UserSetupStep1 from '../UserSetupStep1';
import UserSetupStep2 from '../UserSetupStep2';
import UserSetupStep3 from '../UserSetupStep3';
import UserSetupStep4 from '../UserSetupStep4';
import UserSetupStep5 from '../UserSetupStep5';
import UserSetupComplete from '../UserSetupComplete';

function UserSetupForm() {
  const INITIAL_USER_VALUES = { firstName: "", lastName: "", isParent: true };
  const INITIAL_FAMILY_VALUES = { familyId: "", familyName: "" };
  const [hasFamilyId, setHasFamilyId] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_USER_VALUES);
  const [newFamData, setNewFamData] = useState(INITIAL_FAMILY_VALUES);


  const handleChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = evt.currentTarget;
    if (name === "familyName" || name === "familyId") {
      setNewFamData(currData => ({ ...currData, [name]: value }));
    } else {
      setFormData(currData => ({ ...currData, [name]: value }));
    }
  }

  const handleIsParentChange = (value: boolean) => {
    setFormData(currData => ({ ...currData, isParent: value }));
    console.log("submitting to backend to update the user info...", formData);
    // submit to the backend endpoint.
    next();
  }

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    console.log("submitting to backend to create/add family info....", newFamData);
    next();
  }

  const next = () => {
    setCurrentStep(currentStep + 1);
  }

  const prev = () => {
    setCurrentStep(currentStep - 1);
  }

  return (
    <div className="UserSetupForm" id="UserSetupForm">
      <UserSetupStep1 value={formData.firstName} handleChange={handleChange} next={next} currentStep={currentStep} />
      <UserSetupStep2 value={formData.lastName} handleChange={handleChange} next={next} prev={prev} currentStep={currentStep} />
      <UserSetupStep3 value={formData.isParent} handleIsParentChange={handleIsParentChange} handleSubmit={handleSubmit} next={next} prev={prev} currentStep={currentStep} />
      <UserSetupStep4 setHasFamilyId={setHasFamilyId} next={next} currentStep={currentStep} />
      <UserSetupStep5 isParent={formData.isParent} famIdValue={newFamData.familyId} famNameValue={newFamData.familyName} hasFamilyId={hasFamilyId} handleChange={handleChange} handleSubmit={handleSubmit} next={next} prev={prev} currentStep={currentStep} />
      <UserSetupComplete currentStep={currentStep} />
    </div>
  );
}

export default UserSetupForm;