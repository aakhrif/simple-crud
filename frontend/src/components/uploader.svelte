<script lang="ts">
    import {createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher()
    const cloudName = ""
    const unsignedUploadPreset = '';
    export let multiple = false
    let uploadedFiles: any[] = []
    function handleUpload(event: any) {
        if(multiple ){
            for(let file = 0; file < event.target.files.length; file++) {
                uploadFile(event.target.files[file] , event.target.files.length)
            }
        }else{
            uploadFile(event.target.files[0] , 1)
        }
    }

    async function uploadFile(file: any ,  length: number) {
        console.log('uploadFile... ')
        var formdata = new FormData();
        formdata.append("file", file , file.name)
        formdata.append('upload_preset', unsignedUploadPreset);
        formdata.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary

        // TO DO
        var url = ''; //`https://api.cloudinary.com/v1_1/${cloudName}/upload`;
        var response = await fetch(url, {
            method: 'POST', 
            body: formdata
        })
        response = await response.json()
        emitData(response , length)
    }
    function emitData(info: any , length: any) {
        if(length == 1) {
            dispatch('upload' , info.url)
        }else{
            uploadedFiles.push(info.url)
            if(length === uploadedFiles.length){
                dispatch('upload' , uploadedFiles)
            }
        }
    }
</script>

<input type="file" name="file"  accept="image/x-png,image/jpeg,application/pdf" on:change={handleUpload} multiple={multiple}>