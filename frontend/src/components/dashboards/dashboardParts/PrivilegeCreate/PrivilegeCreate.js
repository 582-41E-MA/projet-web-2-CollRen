import React, { useState } from 'react';
import MenuDashboardAdmin from '../../MenuDashboardAdmin/MenuDashboardAdmin';
import ChampText from '../../../partialsFormulaire/ChampText/ChampText';

function PrivilegeCreate({ t }) {
  const [formData, setFormData] = useState({
    privilege_en: '',
    privilege_fr: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      type: `{en: ${formData.privilege_en}, fr: ${formData.privilege_fr}}`
    };
    console.log(payload);

    try {
      const response = await fetch('http://localhost:5000/api/privileges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      console.log(response.body);


      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
      alert('Privilege created successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert(`Failed to create privilege: ${error.message}`);
    }
    e.target.reset();
  };

  return (
    <div className="flex">
      <div>
        <MenuDashboardAdmin t={t} />
      </div>

      <div className="w-[30%] mx-[4rem] mt-24">
        <h2 className="p-3">Ajouter un privilège</h2>

        <form onSubmit={handleSubmit} className="p-3">
          <div className="mb-3">
            <label htmlFor="privilege_en" className="form-label">Privilege in English</label>
            <ChampText
              type="text"
              className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
              id="privilege_en"
              name="privilege_en"
              value={formData.privilege_en}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="privilege_fr" className="form-label">Privilege in French</label>
            <ChampText
              type="text"
              className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
              id="privilege_fr"
              name="privilege_fr"
              value={formData.privilege_fr}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-600"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default PrivilegeCreate;
