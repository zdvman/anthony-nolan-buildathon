export function emailTemplates(): string {
  return JSON.stringify([
    {
      userQuestion: 'Update Your Details',
      chatResponse: `
     You can update your details via our website: https://www.anthonynolan.org/update 		
     If you have any further questions please contact our Register Support Team by emailing register.support@anthonynolan.org, or calling 0207 424 6567 between 9am and 5pm, Monday to Friday.
   `,
    },
    {
      userQuestion: `Can I Join More Than One Register?`,
      chatResponse: `
     You only need to be signed up to one stem cell register, as we all work together to find a match for a patient.
 
     In order to join the Anthony Nolan register potential donors need to be aged 16-30 and be in good general health. You must be resident in the UK and must be willing to donate anonymously to anybody you match anywhere in the world.
 
     You can find our online application form here: https://www.anthonynolan.org/help-save-a-life/join-stem-cell-register 
     
     If you are over the age of 30, there are two other options. 
     DKMS, who accept new donors in the 17-55 age range.  Please see https://www.dkms.org.uk/en for more information or call 0208 747 5620.
     The British Bone Marrow Register, which is run by the NHS Blood & Transplant Service.  If you are interested in joining you can enquire at your next blood donor session, see their website https://www.nhsbt.nhs.uk/british-bone-marrow-registry/  or contact them on 0300 123 2323.
 
     Whichever register you join, you will be searched for every patient.
 
     We really appreciate your support!
     `,
    },
    {
      userQuestion: `Where Is My Swab Kit?`,
      chatResponse: `
     
     `,
    },
    {
      userQuestion: ``,
      chatResponse: `
     We’re sorry you have not received your swab kit yet. We usually allow 3 weeks for the swab kits to be delivered.
     So if you have not received your swab kit by this time please contact our Register Support Team by emailing register.support@anthonynolan.org, or calling 0207 424 6567 between 9am and 5pm, Monday to Friday and we will be happy to send you a new swab pack.
     Thank you so much for your interest in supporting Anthony Nolan- we really appreciate it!
     `,
    },
    {
      userQuestion: `Removal From Register`,
      chatResponse: `
     To be removed from our register please contact our Register Support Team by emailing register.support@anthonynolan.org, or calling 0207 424 6567 between 9am and 5pm, Monday to Friday.
     `,
    },
    {
      userQuestion: `Am I Already On The Register?`,
      chatResponse: `
     To find out if you are already on our register please contact our Register Support Team by emailing register.support@anthonynolan.org, or calling 0207 424 6567 between 9am and 5pm, Monday to Friday.
     `,
    },
  ]);
}
