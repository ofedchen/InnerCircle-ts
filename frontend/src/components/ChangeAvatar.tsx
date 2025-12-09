export default function ChangeAvatar() {
	return <></>;
}

/* 

psuedo code for tdd ChangeAvatar. 

button with symbol + is on profilepage, it has test-id=”change-avatar-btn”. click()
select file, upload(). 
multer will change name on file  so that is smiliar to circle-slug but add suffix number. 
multer removes the old avtarfile. 
imgsrc in avatar will be set to use the new file name. 
new avatar will be dislpayed in profile page. 

expect 
cy. image (circle_avatar) toBeVisible on page.  */
