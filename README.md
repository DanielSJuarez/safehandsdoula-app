<h1>SafeHandsDoula README</h1>
<hr/>
<p>SafeHandsDoula at safehandsdoula.com acts a doula networking platform where doula's can connect their profiles, and public links in a one-stop-shop location for users, doulas and potential clients. With multiple communication forms through direct contact submission or calendly. SafeHands tries to make communcation easy between user types. For the visiting user, or expecting mother. The aim of SafeHands is to provide a warm and safe online environement with simple and clear data on what and how a doula might improve the birth experience, and who might they be able to reach out for this service. With warm styling, and clear communication patterns the goal is to easy the user if concerns, and provie clarity as quickly as possible. </p>

<h3>Tech Stack/API's</h3>
 <ul>
    <li>React</li>
    <li>Django</li>
    <li>Heroku</li>
    <li>Netlify</li>
    <li>Calendly API</li>
    <li>Calendly Embed API</li>
 </ul>

 <h3>Third Party API Config</h3>
   <a target='blank' herf='https://developer.calendly.com/api-docs/ZG9jOjQ1Mg-introduction'>Calendly Docs</a>

   <h4>Requirements</h4>
   <ul>
        <li>Oauth 2.0</li>
        <li>Calendly Account</li>
        <li>Lastpass account</li>
   </ul>
    <p>Connecting with the Calendly API will require Oauth 2.0. This means clone hosting for this project will require a DNS host with SSL certificate. Configuration using Netlify is a free option to do this. Calendly will require an Lastpass account to send an authorization code. You will need to provide your organization settings an a redirect url that the site shoudl direct to after linking. *Note this should taking into account site internal linking. Additionally, if testing on dev, a localhost redirect url will be required for testing. Once the authorization code is received, you can set up a link url that will provide an access token in the search params upon calendly user authorization is completed. From there a simple fetch request using this code and get specific information required. I wishing to use Calendly with React project use the link below</p>
    <a target='blank' herf='https://www.npmjs.com/package/react-calendly'>Calendly Docs</a>
   
  

