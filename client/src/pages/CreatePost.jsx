import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import preview from '../assets/preview.png';
import { getRandomPrompt } from '../utils';
import FormField from '../components/FormField';
import { Loader } from '../components';

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(`http://localhost:8080/api/v1/stability`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });
        const data = await response.json();

        if (data.photo?.startsWith('data:image/') || data.photo?.startsWith('http')) {
          setForm({ ...form, photo: data.photo });
        } else {
          alert('Failed to generate image');
        }
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please enter a prompt');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/api/v1/post`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        });

        const result = await response.json();
        if(response.ok){
          navigate('/',{state:{refresh:true}});
        }
        else{
          alert(result.message)
        }
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please enter a prompt and generate an image');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  return (
    <section className="max-w-3xl mx-auto px-6 py-10 bg-white dark:bg-gray-700 dark:text-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-300">Create Your Image</h1>
        <button
          onClick={() => navigate('/')}
          className="text-sm text-blue-600 font-bold dark:text-blue-400 hover:underline"
        >
          ← Go Back
        </button>
      </div>

      <p className="text-gray-500 mb-6 dark:text-gray-400">
        Generate imaginative visuals with AI and share them with the world!
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 dark:text-white">
        <FormField
          labelName="Your name"
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          handleChange={handleChange}
        />

        <FormField
          labelName="Prompt"
          type="text"
          name="prompt"
          placeholder="A Samurai riding a Horse on Mars, lomography."
          value={form.prompt}
          handleChange={handleChange}
          isSurpriseMe
          handleSurpriseMe={handleSurpriseMe}
        />

        <div className="relative w-full max-w-md mx-auto border border-gray-300 rounded-lg h-64 flex items-center justify-center bg-gray-50">
          {form.photo ? (
            <img
              src={form.photo}
              alt={form.prompt}
              className="w-full h-full object-contain rounded"
            />
          ) : (
            <img
              src={preview}
              alt="preview"
              className="w-3/4 h-3/4 object-contain opacity-40"
            />
          )}

          {generatingImg && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
              <Loader />
            </div>
          )}
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={generateImage}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-5 rounded-md transition"
          >
            {generatingImg ? 'Generating...' : 'Generate Image'}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 mb-2 dark:text-gray-300">
            Once you have generated your image, share it with the community!
          </p>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-md"
          >
            {loading ? 'Sharing...' : 'Share'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;

