export const mailOtp = (otp): string => {
  return `
<html lang='en'>

  <head>
    <meta charset='UTF-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <title>OTP Verification Email</title>

    <style>
      @import
      url('https://fonts.googleapis.com/css2?family=Darker+Grotesque:wght@300;400;500;600;700;800;900&display=swap');
      @import
      url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&display=swap');
      html, body { padding: 65px 65px 65px 65px; height: 923px; background:
      var(--bg, radial-gradient(132.21% 68.86% at 43.76% 52.23%, #040e2c 0.47%,
      #000 100%)); position: relative; margin: auto; font-family: Darker
      Grotesque, sans-serif; display: flex; justify-content: center; }
      .header-container { display: flex; align-items: baseline; } .itclub,
      .ictmeetup { flex-shrink: 0; margin-bottom: 32px; } .ictmeetup { width:
      207px; height: 65px; } .image-container { width: 646px; display: flex;
      justify-content: space-between; } .container { position: relative;
      padding: 48px 32px 48px 32px; width: 598px; height: fit; border-radius:
      24px; background: rgba(9, 13, 27, 0.5); box-shadow: 0px 0px 150px -10px
      #061847; backdrop-filter: blur(20px); border-style: border-box;
      margin-bottom: 32px; } h1, .dot, p, .note, .button, .note2 { max-width:
      488px; margin-right: 32px; margin-left: 32px; text-align: justify; } h1 {
      color: #fff; font-family: Syncopate; font-size: 32px; font-style: normal;
      font-weight: 600; line-height: 40px; text-transform: uppercase;
      margin-bottom: 0px; } .dot { color: var(--Secondary, #e76028);
      font-family: Syncopate; font-size: 32px; font-weight: 600; line-height:
      40px; text-transform: uppercase; margin: 0 10px; } p { color: #c6c6c6;
      font-family: Darker Grotesque; font-size: 20px; font-style: normal;
      font-weight: 600; line-height: 130%; } .otp-container { display: flex;
      margin: auto; margin: 0px 32px 0px 32px; height: 96px; padding: 8px;
      justify-content: center; align-items: center; margin-top: 0px;
      border-radius: 8px; border: 1px solid var(--Stroke, #2172eb);
      border-style: border-box; background: var(--fill, linear-gradient(97deg,
      rgba(11, 41, 120, 0.38) -1.24%, rgba(7, 26, 74, 0.38) 49.38%, rgba(9, 37,
      107, 0.33) 100%)); } .otp { font-size: 50px; font-weight: 700;
      line-height: 64px; letter-spacing: 12px; font-family: Darker Grotesque; }
      .note { font-size: 14px; font-weight: 400; line-height: 20px;
      letter-spacing: 0.28px; } .button { display: inline-flex; width: 100%;
      max-width: 488px; padding: 12px 24px; justify-content: center;
      align-items: center; margin-top: 20px; gap: 12px; border-radius: 4px;
      background: linear-gradient(92deg, #546ffe 2.7%, #2c3dd2 62.04%, #0a459f
      103.68%); box-shadow: 0px 0px 20px 0px rgba(11, 82, 188, 0.8); color:
      #fff; font-family: Darker Grotesque; font-size: 20px; font-weight: 700;
      text-decoration: none; } .button img { max-width: 24px; height: auto; }
      .button:hover { box-shadow: 0px 0px 20px 0px rgba(6, 36, 82, 0.8); color:
      wheat; } .buttton:hover img { color: wheat } .note2 { font-size: 18px;
      font-weight: 500; line-height: 26px; text-align: left; } .link, .linksite,
      .footer { color: #c6c6c6; text-align: center; font-family: Darker
      Grotesque; font-size: 18px; font-style: normal; line-height: 18px;
      text-decoration: none; position: relative; display: flex; justify-content:
      center; bottom: 0; margin-bottom: 0; } .linksite { font-weight: 500; }
      .link { font-weight: 700; } .linksite:hover { color: #fff; } .footer {
      font-size: 14px; font-weight: 400; line-height: 20px; letter-spacing:
      0.28px; } .footer-container { width: 646px; display: flex;
      justify-content: center; align-items: center; }
    </style>
  </head>

  <body>
    <div>
      <div class='image-container'>
        <img
          src='https://ictv7.primeitclub.com/mailAssets/ictMeetup.png'
          alt='ictmeetup'
          class='ictmeetup'
        />
        <img
          src='https://ictv7.primeitclub.com/mailAssets/itClub.png'
          alt='itclub'
          class='itclub'
          style="  margin-left: 350px;"
/>
      </div>

      <div class='container'>
        <div class='header-container'>
          <h1>OTP Verification</h1>
          <p class='dot'>.</p>
        </div>
        <p>
          Please enter this confirmation code in the window where you started
          creating your account.
        </p>
        <div class='otp-container'>
          <p class='otp'
          style="margin: 20px 0 0 35%;"
          >${otp}</p>
        </div>

        <p class='note'>*This code is valid for 30 minutes only.</p>
        <a href='ictv7.primeitclub.com' class='button'>Visit Website
          <img
            src='https://ictv7.primeitclub.com/mailAssets/right.png'
            alt='right'
          />
        </a>
        <p class='note2'>
          If you didn&apos;t create an account on ictv7.primeitclub.com,
          please ignore this message.
        </p>
      </div>

      <div class='footer-container'>
        <div>
          <p class='link'>
            Prime IT Club -
            <a
              href='https://www.primeitclub.com/'
              class='linksite'
            >www.primeitclub.com</a>
            <p class='footer'>Prime College, Khusibu, Nayabazaar</p>
          </p>
        </div>
      </div>
    </div>
  </body>

</html>

`;
};

export const mailOtpOrganizer = (data): string => {
  const {
    teamLeader,
    paymentPhoto,
    paymentStatus,
    teamName,
    sdgGoal,
    ideaName,
    ideaDescription,
    TeamMembers,
    collegeName,
    created_at,
    updated_at
  } = data;

  return `
      <html lang='en'>
      <body>
        <h1>Registration Details</h1>
        <table>
          <tr>
            <td><strong>Team Leader ID:</strong></td>
            <td>${teamLeader.id}</td>
          </tr>
          <tr>
            <td><strong>Payment Photo:</strong></td>
            <td><img src="ictv7.primeitclub.com/${paymentPhoto}" alt="Payment Photo" style="max-width: 200px; max-height: 200px;"></td>
          </tr>
          <tr>
            <td><strong>Payment Status:</strong></td>
            <td>${paymentStatus ? 'Paid' : 'Pending'}</td>
          </tr>
          <tr>
            <td><strong>Team Name:</strong></td>
            <td>${teamName}</td>
          </tr>
          <tr>
            <td><strong>SDG Goal:</strong></td>
            <td>${sdgGoal}</td>
          </tr>
          <tr>
            <td><strong>Idea Name:</strong></td>
            <td>${ideaName}</td>
          </tr>
          <tr>
            <td><strong>Idea Description:</strong></td>
            <td>${ideaDescription}</td>
          </tr>
          <tr>
            <td><strong>Team Members:</strong></td>
            <td>${TeamMembers}</td>
          </tr>
          <tr>
            <td><strong>College Name:</strong></td>
            <td>${collegeName}</td>
          </tr>
          <tr>
            <td><strong>Created At:</strong></td>
            <td>${created_at}</td>
          </tr>
          <tr>
            <td><strong>Updated At:</strong></td>
            <td>${updated_at}</td>
          </tr>
        </table>
      </body>
      </html>`;
};
