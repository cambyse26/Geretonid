export default {
    getValues(selector) {
        let inputs = document.querySelectorAll(selector);
        let values = {};
        inputs.forEach(input => {
            values[input.id] = input.value;
        });
        return values;
    },
    // Ajouter les bons champs dans la partie informations complémentaires
    addModalFields({ dataset }) {
        let fields = "";
        const title = `
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Informations complémentaires</h5>
            </div>
        `;
        // dataset.form: attribut data-form
        switch (dataset.form) {

            case "compte":
                fields = `
                    ${title}
                   
                    <div class="form-group">
                        <label for="Identifiant" class="col-form-label">Identifiant du compte concerné</label>
                        <input type="text" name="identifiant" onchange="preview()" id="Identifiant" class="form-control" placeholder="">
                    </div>
                    <div class="form-group">
                        <label for="Reseau_Social" class="col-form-label">Nom du réseau social</label>
                        <input type="text" name="social_network" onchange="preview()" class="form-control" id="Reseau_Social" placeholder="Ex : Facebook, Twitter, Linkedin,">
                    </div>
                    <div class="form-group">
                        <label for="Url" class="col-form-label">Url précise sur laquelle sont publiées les informations vous concernant</label>
                        <input type="text" name="heure_fin" onchange="preview()" class="form-control" id="Url" placeholder="http://www.">
                    </div>
                    <div class="form-group">
                        <label for="Delete_Infos" class="col-form-label">Précisez les informations à supprimer</label>
                        <textarea name="delete_infos" onchange="preview()" class="form-control" id="Delete_Infos" rows="4"></textarea>
                    </div>
                `;
                break;

            case "financier":
                fields = `
                    ${title}
                    <div class="form-group">
                        <label for="Identifiant" class="col-form-label">Identifiant client ou numéro de compte</label>
                        <input type="text" name="compte" onchange="preview()" id="Identifiant" class="form-control" placeholder="Votre n° de compte">
                    </div>
                `;
                break;

            case "prospection":
                fields = `
                    ${title}
                    <div class="form-group">
                        <label for="Identifiant" class="col-form-label">Identifiant client ou numéro de compte</label>
                        <input class="form-control" onchange="preview()" id="Identifiant" placeholder="Exemple: ">
                    </div>
                `;
                break;

            case "rectifier":
                fields = `
                    ${title}
                    <div class="form-group">
                        <label for="Rectifier" class="col-form-label">Informations à rectifier</label>
                        <textarea name="infos_rectif" onchange="preview()" class="form-control" id="Rectifier" rows="4"></textarea>
                    </div>                        
                    <div class="form-group">
                        <label for="Rectifiees" class="col-form-label">Informations rectifiées</label>
                        <textarea name="rectif_infos" onchange="preview()" class="form-control" id="Rectifiees" rows="4"></textarea>
                    </div>
                `;
                break;

            case "site":
                fields = `
                    ${title}
                    <div class="form-group">
                        <label for="Urls" class="col-form-label">Urls précises sur lesquelles sont publiées les informations vous concernant</label>
                        <textarea rows="4" class="form-control" onchange="preview()" id="Urls" placeholder="Exemple: "></textarea>
                    </div>
                    <div class="form-group">
                        <label for="Info" class="col-form-label">Précisez les informations à supprimer</label>
                        <textarea rows="4" class="form-control" onchange="preview()" id="Info" placeholder="Exemple: "></textarea>
                    </div>
                    <div class="form-group">
                        <label for="Motif" class="col-form-label">Précisez les raisons pour lesquelles vous souhaitez faire effacer ces données</label>
                        <textarea rows="2" maxlength="150" class="form-control" id="Motif" onchange="preview" placeholder="Exemple: "></textarea>
                    </div>
                `;
                break;

            case "supprime":
                fields = `
                    ${title}
                    <div class="form-group">
                        <label for="Info" class="col-form-label">Informations à supprimer</label>
                        <textarea rows="2" maxlength="150" class="form-control" id="Info" onchange="preview()" placeholder="Exemple: Toutes mes données personnelles "></textarea>
                    </div>
                    <div class="form-group">
                        <label for="Motif" class="col-form-label">Motif de la suppression</label>
                        <textarea rows="2" maxlength="150" class="form-control" id="Motif" onchange="preview()" placeholder="Exemple: Je ne veux plus que vous stockez mes informations personnelles "></textarea>
                    </div>
                `;
                break;

            case "traitement":
                fields = `
                    ${title}
                    <div class="form-group">
                        <label for="Info" class="col-form-label">Raison de la demande</label>
                        <textarea rows="2" maxlength="150" class="form-control" id="Info" onchange="preview" placeholder="Exemple: Je veux que le traitement cesse "></textarea>
                    </div>
                `;
                break;

            case "video":
                fields = `
                    ${title}
                    <div class="form-group">
                        <label for="Date" class="col-form-label">Date des images que vous souhaitez consulter</label>
                        <input type="date" name="date" onchange="preview()" id="Date" class="form-control">
                    </div>
                    <div class="row">
                        <div class="form-group col">
                            <label for="Heure_debut" class="col-form-label">Heure de début</label>
                            <input type="time" name="heure_debut" onchange="preview()" class="form-control" id="Heure_debut">
                        </div>
                        <div class="form-group col">
                            <label for="Heure_fin" class="col-form-label">Heure de fin</label>
                            <input type="time" name="heure_fin" onchange="preview()" class="form-control" id="Heure_fin">
                        </div>
                    </div>
                `;
                break;
        }

        return document.querySelector('#complementaires').innerHTML = fields;
    },
    changeModalTitle({ innerText }) {
        return document.querySelector('#modal-title').innerText = innerText;
    },
    changePdfButton({ dataset }) {
        return document.getElementById('generate-pdf').setAttribute('data-pdf', dataset.pdf);
    },
    changePreview({ dataset }) {
        return document.getElementById('modal').setAttribute('preview', dataset.pdf);
    },
};