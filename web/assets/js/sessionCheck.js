console.log("sessionStorage.status: "+sessionStorage.status);
if(sessionStorage.status == 0 || typeof sessionStorage.status === 'undefined') {
	console.log("sessionStorage.status--->"+sessionStorage.status);
	location.href="index.html"
}