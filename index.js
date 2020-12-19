((win,doc) => {
    'use strict';

    let convertApi = ConvertApi.auth({secret: 'HCC8KHlMdCgR8KSc'});
    let elResult = doc.getElementById('result');
    let elResultLink = doc.getElementById('resultLink');
    let typeFile = ['docx','pdf','pptx','txt','jpg'];

    elResult.style.display = 'none';

    win.onload = () => {
        for(let x =0;x < doc.querySelectorAll("#typeFile").length; x++){
            for(let file in typeFile){
                let option = doc.createElement("OPTION");
                option.value = typeFile[file];
                option.innerHTML = typeFile[file];
    
                doc.querySelectorAll("#typeFile")[x].appendChild(option);
            }
        }
    }
    
    // On file input change, start conversion
    doc.getElementById('btn-convert').addEventListener('click', async e => {
        elResult.style.display = 'none';
        doc.documentElement.style.cursor = 'wait';
        let select = doc.querySelectorAll("#typeFile");
        
        let file = doc.getElementById('fileInput').files[0];
        let ext;
    
        if(file === undefined){
            alert("Por favor escolha um arquivo!");
            document.documentElement.style.cursor = 'default'
        }else{
            ext = file.name.split('.').pop();
            let z =0;

            for(let x = 0; x < select.length; x++){
                if(select[x].value === ''){
                    z === 1 ? alert('Informe o formato do arquivo e/ou qual o formato que deseja converte-lo!'): '';
                    document.documentElement.style.cursor = 'default';
                    z++;
                }else{
                    if(ext === select[0].options[select[0].selectedIndex].value){
                        try {
                
                            // Converting DOCX to PDF file
                            let params = convertApi.createParams()
                            params.add('file', document.getElementById('fileInput').files[0])
                            let result = await convertApi.convert(
                                select[0].options[select[0].selectedIndex].value, 
                                select[1].options[select[1].selectedIndex].value, 
                                params
                            );
                    
                            // Showing link with the result file
                            elResultLink.setAttribute('href', result.files[0].Url)
                            elResultLink.innerText = result.files[0].Url
                            elResultLink.click();
                    
                            } finally {
                                document.documentElement.style.cursor = 'default'
                            }
                    }else{
                        z === 1 ? alert("O formato do documento upado não condiz com o escolhido!"): '';
                        document.documentElement.style.cursor = 'default';
                    }
                }
            }
        }
    })     
})(window, document);

