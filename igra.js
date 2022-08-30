var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var velicinax = 200;
var velicinay = 200;

canvas.width = innerWidth - velicinax;
canvas.height = innerHeight - velicinay;


function prikaziUpute() {
	alert("Upute igre: Po terenu se krećete pomjeranjem miša. Ukoliko dodirnete manji krug, vaš krug se povećava." +
		"Ukoliko dodirnete veći krug, igra se završava. U nekom trenutku se pojavljuje specijalni kružić, koji ako dodirnete, dešava se nešto od sljedećeg: "+
		"Brzina protivčkih kružica se povećava u nekoliko narednih sekundi/Vaš kružić postaje duplo veći/Vaš kružić postaje duplo manji/"+
		"Smjer kretanja protivničkih kružića se mijenja");
}

class GlavniKrug {
	constructor(x,y,radius,color, brzina) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		this.smjex = undefined;
		this.smjery = undefined;
		this.brzina = brzina;
	}

	nacrtajGlavniKrug() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
		ctx.fillStyle = this.color;
		ctx.fill();
	}
	pomjeriGlavniKrug() {
		if(Math.hypot(mouse.x - this.x, mouse.y - this.y) > this.radius*0.1) {
			
				this.x += this.smjerx;
				this.y += this.smjery;
			
		}
		


	}
}

class Krug {
	constructor(x,y,radius,color, smjerx, smjery,brzina) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		this.smjerx = smjerx;
		this.smjery = smjery;
		this.brzina = brzina;
		this.usao = false;
	}
	nacrtajKrug() {
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
		ctx.fillStyle = this.color;
		ctx.fill();
	}
	pomjeriKrug() {
		this.nacrtajKrug();
		this.x += this.smjerx*this.brzina;
		this.y += this.smjery*this.brzina;
	}
	daLiJeUsao() {
		if(this.x > 0 && this.x < canvas.width && this.y > 0 && this.y < canvas.height) {
			this.usao = true
		}
		
	}
	nacrtajSpecijalanKrug() {
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
		ctx.fillStyle = "rgb(" + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + ")";
		ctx.fill();
	}
	pomjeriSpecijalanKrug() {
		this.nacrtajSpecijalanKrug();
		this.x += this.smjerx*this.brzina;
		this.y += this.smjery*this.brzina;
	}

}
var brzinaKruzica;
var brojNovihKruzica;
var intervalGenerisanjaKrugova = 3000;
var igraGotova = false;
function zapocniLaganu() {
	document.getElementById('odabirTezine').style.display = 'none';
	brzinaKruzica = Math.random()*0.3+1;
	brojNovihKruzica = 4;
	intervalGenerisanjaKrugova = 5000;
	console.log(intervalGenerisanjaKrugova);

};
function zapocniSrednjeTesku() {
	document.getElementById('odabirTezine').style.display = 'none';
	brzinaKruzica = Math.random()*1.2+1;
	brojNovihKruzica = 5;
	intervalGenerisanjaKrugova = 4000;
	console.log(intervalGenerisanjaKrugova);

};
function zapocniTesku() {
	document.getElementById('odabirTezine').style.display = 'none';
	brzinaKruzica = Math.random()*1.8+1.5;
	brojNovihKruzica = 6;
	intervalGenerisanjaKrugova = 3000;
	console.log(intervalGenerisanjaKrugova);

};




var mouse = {
	x:undefined,
	y:undefined
};

addEventListener('mousemove', function(event) {
	if(document.getElementById('odabirTezine').style.display === 'none') {
		ugao = Math.atan2((event.clientY-velicinay/2) - glavniKrug.y, (event.clientX-velicinax/2) - glavniKrug.x);
		x1 = Math.cos(ugao);
		y1 = Math.sin(ugao);
		mouse.x = event.clientX-100;
		mouse.y = event.clientY-100;

		let smjer = {
			x:x1,
			y:y1
		};

		glavniKrug.smjerx = smjer.x*glavniKrug.brzina;
		glavniKrug.smjery = smjer.y*glavniKrug.brzina;
	}
})

const radiusGlavnog = Math.random()*10 + 10;
const brzinaGlavnog = Math.random()*3+2;


var glavniKrug = new GlavniKrug(canvas.width/2,canvas.height/2, radiusGlavnog, 'black',brzinaGlavnog);
glavniKrug.nacrtajGlavniKrug();



var krugovi = [];
function generisiKrugove() {
	for(let i=0;i<5;i++) {
		let radius = Math.random() < 0.5 ? glavniKrug.radius*(0.7+Math.random()*0.3) : glavniKrug.radius*(1+Math.random()*0.2);
		let x;
		let y;
		let smjerx;
		let smjery;
		
		if(Math.random() < 0.5) {

			x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;//vidit treba li dodat velicinax, i dole isto
			y = Math.random()*(canvas.height-radius)+radius;
			//console.log(x + "-1-" + y + "-" + radius);
			if(x < velicinax) {
				smjerx = 1;
				//smjery = Math.random() < 0.5 ? 1 : -1;
				if(Math.random()<0.33)
					smjery = 1;
				else if(Math.random >= 0.33 && Math.random()<0.66)
					smjery = -1;
				else smjery = 0;
			}
			else {
				smjerx = -1;
				//smjery = Math.random() < 0.5 ? 1 : -1;
				if(Math.random()<0.33)
					smjery = 1;
				else if(Math.random >= 0.33 && Math.random()<0.66)
					smjery = -1;
				else smjery = 0;
			}
		}
		else {
			x = Math.random() * (canvas.width-radius)+radius;
			y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
			//console.log(x + "-2-" + y + "-" + radius);
			if(y < velicinay) {
				//smjerx = Math.random() < 0.5 ? 1 : -1;
				if(Math.random()<0.33)
					smjerx = 1;
				else if(Math.random >= 0.33 && Math.random()<0.66)
					smjerx = -1;
				else smjerx = 0;
				smjery = 1;
			}
			else {
				//smjerx = Math.random() < 0.5 ? 1 : -1;
				if(Math.random()<0.33)
					smjerx = 1;
				else if(Math.random >= 0.33 && Math.random()<0.66)
					smjerx = -1;
				else smjerx = 0;
				smjery = -1;
			}
		}
		let color = "rgb(" + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + ")";
		let brzina = brzinaKruzica;
		/*dat krugovima smjer */
		

		krugovi.push(new Krug(x,y,radius,color,smjerx,smjery,brzina)); 
	}
};

function generisiKrug() {
	let radius = Math.random() < 0.5 ? glavniKrug.radius*(0.7+Math.random()*0.3) : glavniKrug.radius*(1+Math.random()*0.2);
		let x;
		let y;
		let smjerx;
		let smjery;
		
		if(Math.random() < 0.5) {

			x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;//vidit treba li dodat velicinax, i dole isto
			y = Math.random()*(canvas.height-radius)+radius;
			//console.log(x + "-1-" + y + "-" + radius);
			if(x < velicinax) {
				smjerx = 1;
				if(Math.random()<0.33)
					smjery = 1;
				else if(Math.random >= 0.33 && Math.random()<0.66)
					smjery = -1;
				else smjery = 0;
				//smjery = Math.random() < 0.5 ? 1 : -1;
			}
			else {
				smjerx = -1;
				if(Math.random()<0.33)
					smjery = 1;
				else if(Math.random >= 0.33 && Math.random()<0.66)
					smjery = -1;
				else smjery = 0;
				//smjery = Math.random() < 0.5 ? 1 : -1;
			}
		}
		else {
			x = Math.random() * (canvas.width-radius)+radius;
			y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
			//console.log(x + "-2-" + y + "-" + radius);
			if(y < velicinay) {
				//smjerx = Math.random() < 0.5 ? 1 : -1;
				if(Math.random()<0.33)
					smjerx = 1;
				else if(Math.random >= 0.33 && Math.random()<0.66)
					smjerx = -1;
				else smjerx = 0;
				smjery = 1;
			}
			else {
				//smjerx = Math.random() < 0.5 ? 1 : -1;
				if(Math.random()<0.33)
					smjerx = 1;
				else if(Math.random >= 0.33 && Math.random()<0.66)
					smjerx = -1;
				else smjerx = 0;
				smjery = -1;
			}
		}
		let color = "rgb(" + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + ")";
		let brzina = brzinaKruzica;
		/*dat krugovima smjer */
		

		krugovi.push(new Krug(x,y,radius,color,smjerx,smjery,brzina));
		
};

console.log(intervalGenerisanjaKrugova);

function generisiKrugovePovremeno() {
	setInterval(() => {
		if(!igraGotova) {
			for(let i=0;i<brojNovihKruzica;i++) {
				console.log("evo krug");
				generisiKrug();
			}
		}
		console.log(intervalGenerisanjaKrugova);
	},intervalGenerisanjaKrugova);
};

var specijalanKrug;
function generisiSpecijalanKrug() {
	let radius = Math.random() < 0.5 ? glavniKrug.radius*(0.7+Math.random()*0.3) : glavniKrug.radius*(1+Math.random()*0.2);
		let x;
		let y;
		let smjerx;
		let smjery;
		
		if(Math.random() < 0.5) {

			x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;//vidit treba li dodat velicinax, i dole isto
			y = Math.random()*(canvas.height-radius)+radius;
			//console.log(x + "-1-" + y + "-" + radius);
			if(x < velicinax) {
				smjerx = 1;
				if(Math.random()<0.33)
					smjery = 1;
				else if(Math.random >= 0.33 && Math.random()<0.66)
					smjery = -1;
				else smjery = 0;
				//smjery = Math.random() < 0.5 ? 1 : -1;
			}
			else {
				smjerx = -1;
				if(Math.random()<0.33)
					smjery = 1;
				else if(Math.random >= 0.33 && Math.random()<0.66)
					smjery = -1;
				else smjery = 0;
				//smjery = Math.random() < 0.5 ? 1 : -1;
			}
		}
		else {
			x = Math.random() * (canvas.width-radius)+radius;
			y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
			//console.log(x + "-2-" + y + "-" + radius);
			if(y < velicinay) {
				//smjerx = Math.random() < 0.5 ? 1 : -1;
				if(Math.random()<0.33)
					smjerx = 1;
				else if(Math.random >= 0.33 && Math.random()<0.66)
					smjerx = -1;
				else smjerx = 0;
				smjery = 1;
			}
			else {
				//smjerx = Math.random() < 0.5 ? 1 : -1;
				if(Math.random()<0.33)
					smjerx = 1;
				else if(Math.random >= 0.33 && Math.random()<0.66)
					smjerx = -1;
				else smjerx = 0;
				smjery = -1;
			}
		}
		let color = "rgb(" + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + ")";
		let brzina = Math.random()+1;
		specijalanKrug = new Krug(x,y,radius,color,smjerx,smjery,brzina);
}


let animationId;
function animate() {
	animationId = requestAnimationFrame(animate);
	ctx.clearRect(0,0,canvas.width,canvas.height);
	glavniKrug.nacrtajGlavniKrug();
	if(glavniKrug.smjerx && glavniKrug.smjery) {
		glavniKrug.pomjeriGlavniKrug();
		if(specijalanKrug) {
			specijalanKrug.pomjeriSpecijalanKrug();
			specijalanKrug.daLiJeUsao();
		}
		if(specijalanKrug) {
			var distancaPremaSpecijalnom = Math.hypot(glavniKrug.x - specijalanKrug.x, glavniKrug.y - specijalanKrug.y);
			if(distancaPremaSpecijalnom - glavniKrug.radius - specijalanKrug.radius < 1) {
			setTimeout(() => {
				specijalanKrug = undefined;/////////
				var randomValue = Math.random();
				if(randomValue < 0.25 && glavniKrug.radius > 19)
					glavniKrug.radius = glavniKrug.radius/2;
				else if(randomValue>= 0.25 && randomValue < 0.50) glavniKrug.radius += glavniKrug.radius/2;
				else if(randomValue>= 50 && randomValue <75) {
					for(let i = 0;i<krugovi.length;i++) {
						if(krugovi[i].smjerx === 1) {
							krugovi[i].smjerx = -1;
							if(krugovi[i].smjery === 1)
								krugovi[i].smjery = -1;
							else if(krugovi[i].smjery === -1)
								krugovi[i].smjery = 1;
						}
						else if(krugovi[i].smjerx === -1) {
							krugovi[i].smjerx = 1;
							if(krugovi[i].smjery === 1)
								krugovi[i].smjery = -1;
							else if(krugovi[i].smjery === -1)
								krugovi[i].smjery = 1;
						}
						else {
							krugovi[i].smjerx = 1;
							if(krugovi[i].smjery === 1)
								krugovi[i].smjery = -1;
							else if(krugovi[i].smjery === -1)
								krugovi[i].smjery = 1;
						}
					}
				}
				else {
					for(let i=0;i<krugovi.length;i++) {
						krugovi[i].brzina = krugovi[i].brzina*2;
					}
					setTimeout(() => {
						for(let i=0;i<krugovi.length;i++) {
						krugovi[i].brzina = krugovi[i].brzina/2;
					}
					},5000);
				}
				},0);
			}
		}
		if(specijalanKrug && specijalanKrug.usao && (specijalanKrug.x < 0 || specijalanKrug.x > canvas.width || specijalanKrug.y < 0 || specijalanKrug.y > canvas.height)) {
			setTimeout(() => {
				specijalnKrug = undefined;
			},0);
		}
		for(let i=0;i<krugovi.length;i++) {
			krugovi[i].pomjeriKrug();
			krugovi[i].daLiJeUsao();
			let distanca = Math.hypot(glavniKrug.x - krugovi[i].x, glavniKrug.y - krugovi[i].y);
			if(distanca - glavniKrug.radius - krugovi[i].radius < 1 && glavniKrug.radius > krugovi[i].radius) {
				setTimeout(() => {
					glavniKrug.radius += krugovi[i].radius*0.04;
				krugovi.splice(i,1);
			},0);
			}
			else if(distanca - glavniKrug.radius - krugovi[i].radius < 0.1 && glavniKrug.radius < krugovi[i].radius) {
				console.log("Igra Gotova!");
				document.getElementById('krajIgre').style.position = 'absolute';
				document.getElementById('krajIgre').style.display = 'block';
				igraGotova = true;
				cancelAnimationFrame(animationId);
			}
			
			if(krugovi[i].usao && (krugovi[i].x < 0 || krugovi[i].x > canvas.width || krugovi[i].y < 0 || krugovi[i].y > canvas.height)) {
				setTimeout(() => {
					krugovi.splice(i, 1);
					generisiKrug();
				},0);
			}
			
		}
	}
}
generisiKrugove();
setInterval(() => {
	generisiSpecijalanKrug();
},10000);
generisiKrugovePovremeno();
animate(); 