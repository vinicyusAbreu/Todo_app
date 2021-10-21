const entrada = document.querySelector('#entrada');
const conteudoLista = document.querySelector('.conteudo-lista');
const limparTudo = document.querySelector('.limpartudo');
const qtdElemento = document.querySelector('.qtd');
const fil1 = document.querySelector('#fil1');
const fil2 = document.querySelector('#fil2');
const fil3 = document.querySelector('#fil3');

const fill1 = document.querySelector('#fil1');
const fill2 = document.querySelector('.fil2');
const fill3 = document.querySelector('.fil3');


const logo = document.querySelector('.logo');


carregarEvento();

function carregarEvento() {

    document.addEventListener('DOMContentLoaded', carregarLista);


    entrada.addEventListener('keyup', addElemento);

    limparTudo.addEventListener('click', LimparTudo);

    conteudoLista.addEventListener('click', removerLista);

    conteudoLista.addEventListener('click', completarAtivar);

    fil1.addEventListener('click', mostrarTudo);

    fil2.addEventListener('click', ativado);

    fil3.addEventListener('click', completado);

    logo.addEventListener('click', mudarFundo);
}

function addElemento(e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        if (entrada.value !== "") {

            //criando os elementos

            let li = document.createElement('li');
            li.className = 'container-lista ativo';

            let div = document.createElement('div');
            div.className = "checklista";

            let span1 = document.createElement('span');
            span1.className = "checkBoxLista";

            let span2 = document.createElement('span');
            span2.className = "lista";

            let img = document.createElement('img');
            img.className = "fechar";
            img.src = "image/icon-cross.svg";

            //adicionando elemento no dom
            div.appendChild(span1);
            span2.textContent = entrada.value;
            span2.appendChild(img);
            li.appendChild(div);
            li.appendChild(span2);
            conteudoLista.appendChild(li);

            mostrarTudo()

            let array = document.querySelectorAll('.container-lista');

            contcheck = document.querySelectorAll('.checkBoxLista').length;

            qtdElemento.innerHTML = `${(contcheck)} items left`;


            for (let index = 0; index < array.length; index++) {

                if (index > 0) {
                    array[index].childNodes.forEach(elemento => {
                        elemento.style.borderRadius = "0px 0px 0px 0px";
                    })
                }

            }
            salvarLista(entrada.value);
        }
        entrada.value = "";

    }

}

function LimparTudo() {
    conteudoLista.innerHTML = "";
    qtdElemento.innerHTML = `0 items left`;
    liparTodaLista();
}

function removerLista(e) {
    if (e.target.classList.contains('fechar')) {
        e.target.parentElement.parentElement.remove()

        contcheck = document.querySelectorAll('.checkBoxLista').length;

        qtdElemento.innerHTML = `${(contcheck)} items left`;
        removerListaLocalStorage(e.target.parentElement.parentElement)
    }
}

function completarAtivar(e) {

    if (e.target.classList.contains('checkBoxLista')) {

        e.target.className = "checado";

        e.target.parentElement.nextSibling.className = "concluido";
        e.target.parentElement.parentNode.className = "container-lista desativo";

        updateLista(e.target.parentElement.nextSibling.textContent)

        mostrarTudo();

        contcheck = document.querySelectorAll('.checkBoxLista').length;

        qtdElemento.innerHTML = `${(contcheck)} items left`;

    } else if (e.target.classList.contains('checado')) {
        e.target.className = "checkBoxLista";
        e.target.parentElement.nextSibling.className = "lista";
        e.target.parentElement.parentNode.className = "container-lista ativo";

        updateLista(e.target.parentElement.nextSibling.textContent)

        mostrarTudo();

        contcheck = document.querySelectorAll('.checkBoxLista').length;

        qtdElemento.innerHTML = `${(contcheck)} items left`;
    }

}


function mostrarTudo() {

    fil1.classList.add('selecionado');
    fil2.classList.remove('selecionado');
    fil3.classList.remove('selecionado');

    ativo = document.querySelectorAll('.checado');

    ativo.forEach(elemento => {

        elemento.parentNode.parentNode.className = 'container-lista desativo';
    })

    completo = document.querySelectorAll('.checkBoxLista');

    completo.forEach(elemento => {

        elemento.parentNode.parentNode.className = 'container-lista ativo';

    })
}

function ativado() {
    fil1.classList.remove('selecionado');
    fil2.classList.add('selecionado');
    fil3.classList.remove('selecionado');
    ativo = document.querySelectorAll('.checado');

    ativo.forEach(elemento => {

        elemento.parentNode.parentNode.className = 'container-lista desativo esconder';
    })

    completo = document.querySelectorAll('.checkBoxLista');

    completo.forEach(elemento => {

        elemento.parentNode.parentNode.className = 'container-lista ativo';

    })

}

function completado() {
    fil1.classList.remove('selecionado');
    fil2.classList.remove('selecionado');
    fil3.classList.add('selecionado');
    completo = document.querySelectorAll('.checkBoxLista');

    completo.forEach(elemento => {

        elemento.parentNode.parentNode.className = 'container-lista ativo esconder';

    })

    ativo = document.querySelectorAll('.checado');

    ativo.forEach(elemento => {

        elemento.parentNode.parentNode.className = 'container-lista desativo';
    })
}

function mudarFundo() {

    if (logo.id === "dark") {
        let css = document.querySelector("link[href='css/estilo.css']");
        css.href = "css/estilo2.css"
        logo.src = "image/icon-moon.svg"
        logo.id = 'light';
    } else {
        let css = document.querySelector("link[href='css/estilo2.css']");
        css.href = "css/estilo.css"
        logo.src = "image/icon-sun.svg"
        logo.id = 'dark';
    }



}



//local Storage

function salvarLista(lista) {
    let listas;
    if (localStorage.getItem('listas') === null) {
        listas = [];
    } else {
        listas = JSON.parse(localStorage.getItem('listas'));
    }
    listas.push({ ativado: false, elemento: lista });

    localStorage.setItem('listas', JSON.stringify(listas));
}

function carregarLista() {
    let listas;
    if (localStorage.getItem('listas') === null) {
        listas = [];
    } else {
        listas = JSON.parse(localStorage.getItem('listas'));
    }

    listas.forEach(lista => {
        if (lista['ativado'] === false) {
            var li = document.createElement('li');
            li.className = 'container-lista ativo';

            var span1 = document.createElement('span');
            span1.className = "checkBoxLista";

            var span2 = document.createElement('span');
            span2.className = "lista";

        } else {
            var li = document.createElement('li');
            li.className = 'container-lista desativo';

            var span1 = document.createElement('span');
            span1.className = "checado";

            var span2 = document.createElement('span');
            span2.className = "concluido";
        }

        let div = document.createElement('div');
        div.className = "checklista";

        let img = document.createElement('img');
        img.className = "fechar";
        img.src = "image/icon-cross.svg";

        //adicionando elemento no dom
        div.appendChild(span1);
        span2.textContent = lista['elemento'];
        span2.appendChild(img);
        li.appendChild(div);
        li.appendChild(span2);
        conteudoLista.appendChild(li);

        mostrarTudo()

        let array = document.querySelectorAll('.container-lista');

        contcheck = document.querySelectorAll('.checkBoxLista').length;

        qtdElemento.innerHTML = `${(contcheck)} items left`;


        for (let index = 0; index < array.length; index++) {

            if (index > 0) {
                array[index].childNodes.forEach(elemento => {
                    elemento.style.borderRadius = "0px 0px 0px 0px";
                })
            }
        }
    });
}


function removerListaLocalStorage(listaItem) {
    let listas;
    if (localStorage.getItem('listas') === null) {
        listas = [];
    } else {
        listas = JSON.parse(localStorage.getItem('listas'));
    }

    listas.forEach(function(lista, index) {
        if (listaItem.textContent === lista['elemento']) {
            listas.splice(index, 1);
        }
    });

    localStorage.setItem('listas', JSON.stringify(listas));
}

function liparTodaLista() {
    localStorage.clear();
}

function updateLista(ele) {
    let listas;
    if (localStorage.getItem('listas') === null) {
        listas = [];
    } else {
        listas = JSON.parse(localStorage.getItem('listas'));
    }
    listas.forEach(function(lista, index) {
        if (ele === lista['elemento']) {
            if (lista.ativado === false) {
                lista.ativado = true;
            } else {
                lista.ativado = false;
            }


        }
        localStorage.setItem('listas', JSON.stringify(listas));
    });
}