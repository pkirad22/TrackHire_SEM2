import axios from 'axios';

export const generateFollowUpEmail =
  async (job) => {

    const token =
      localStorage.getItem(
        'trackhireToken'
      );

    const res =
      await axios.post(

        '/api/gemini/followup-email',

        job,

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    return res.data.email;
  };