// Função para gerar o QR Code
function gerarQrCode() {

    var texto = document.getElementById('entradaTexto').value;
    
    if (texto) {
        document.getElementById('qrcode').innerHTML = '';
        

        var qrcode = new QRCode(document.getElementById('qrcode'), {
            text: texto,
            width: 128,
            height: 128,
            colorDark : "#000000",  
            colorLight : "#ffffff", 
            correctLevel : 1 
        });
    } else {
        
        alert("Por favor, insira um texto para gerar o QR Code.");
    }
}

function compartilharQrCode() {
    // Criar a imagem do QR Code gerado
    var canvas = document.querySelector('#qrcode canvas');
    
    // Verificar se o QR Code foi gerado
    if (canvas) {
        // Obter os dados da imagem do QR Code
        var imagemQrCode = canvas.toDataURL("image/png"); // Converte o QR Code para uma URL de imagem PNG (base64)

        // Converter o base64 para um Blob (arquivo binário)
        fetch(imagemQrCode)
            .then(res => res.blob())  // Converte a URL base64 para Blob
            .then(blob => {
                // Cria um arquivo a partir do Blob
                const file = new File([blob], 'qrcode.png', { type: 'image/png' });

                // Verificar se o navegador suporta a Web Share API com arquivos
                if (navigator.canShare && navigator.canShare({ files: [file] })) {
                    // Usar a API Web Share
                    navigator.share({
                        title: 'QR Code Gerado',
                        text: 'Veja meu QR Code!',
                        files: [file],  // Passa o arquivo
                    })
                    .then(() => console.log('QR Code compartilhado com sucesso!'))
                    .catch((err) => console.error('Erro ao compartilhar:', err));
                } else {
                    alert('Seu navegador não suporta o compartilhamento de QR Code via Web Share.');
                }
            })
            .catch(err => {
                console.error('Erro ao converter a imagem para arquivo:', err);
                alert('Erro ao tentar compartilhar o QR Code.');
            });
    } else {
        alert('Nenhum QR Code gerado para compartilhar!');
    }
}


function baixarQrCode() {
    // Criar a imagem do QR Code gerado
    var canvas = document.querySelector('#qrcode canvas');
    
    // Verificar se o QR Code foi gerado
    if (canvas) {
        var imagemQrCode = canvas.toDataURL(); // Converte o QR Code para uma URL de imagem (base64)

        // Criar um link de download
        var link = document.createElement('a');
        link.href = imagemQrCode;  // Definir o URL da imagem gerada
        link.download = 'qrcode.png'; // Definir o nome do arquivo
        link.click();  // Disparar o download
    } else {
        alert('Nenhum QR Code gerado para baixar!');
    }
}
