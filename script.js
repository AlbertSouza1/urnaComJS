let seuVotoPara = document.querySelector('.cima-voto-para span');
let cargo = document.querySelector('.cima-cargo span');
let descricao = document.querySelector('.cima-infos');
let aviso = document.querySelector('.baixo');
let lateral = document.querySelector('.cima-right');
let numeros = document.querySelector('.cima-digitos');

let etapaAtual = 0;
let numero = '';
let votoBranco = true;
let votoConfirmado = false;
let votos = [];

function comecarEtapa() {

    let etapa = etapas[etapaAtual];

    votoBranco = false;
    numeroHtml = '';
    numero = '';

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHtml += '<div class="numero pisca"></div>';
        }
        else {
            numeroHtml += '<div class="numero"></div>';
        }

    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });
    if (candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;
        aviso.style.display = 'block';

        let fotosHtml = '';
        for (let i in candidato.fotos) {

            if (candidato.fotos[i].small) {
                fotosHtml += `<div class="cima-right-image small"><img src="${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`;
            } else {
                fotosHtml += `<div class="cima-right-image"><img src="${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`;
            }

        }

        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `<div class="aviso-grande pisca">VOTO NULO</div>`;
    }
}

function clicou(n) {
    let elementoNumero = document.querySelector('.numero.pisca');
    if (elementoNumero != null) {
        elementoNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elementoNumero.classList.remove('pisca');
        if (elementoNumero.nextElementSibling != null) {
            elementoNumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }

    }
}

function branco() {

    if (votoConfirmado == true) {

    } else {
        numero = '';
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `<div class="aviso-grande pisca">VOTO EM BRANCO</div>`;
        numeros.innerHTML = '';
        lateral.innerHTML = '';
    }


}

function corrige() {
    comecarEtapa();
}

function confirma() {
    let etapa = etapas[etapaAtual];


    if (votoBranco === true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto:'branco'
        });
    }
    else if (numero.length == etapa.numeros) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto:numero
        });
    }
    else {
        alert('Não é possível confirmar um voto incompleto!');
    }

    if (votoConfirmado) {

        etapaAtual++;
        if (etapas[etapaAtual] !== undefined) {
            votoConfirmado = false;
            comecarEtapa();
        }
        else {
            document.querySelector('.tela').innerHTML = `<div class="fim pisca"><span>FIM</span></div>`;
            console.log(votos);
        }
    }
}

comecarEtapa();
