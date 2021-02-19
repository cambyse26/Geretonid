import jsPDF from 'jspdf';
import PdfView from '@/services/PDFView';
// import { embed } from 'pdfobject';

export default{
    generate(pdf, values) {
        const doc = new jsPDF();
        const NP = `${values.PrenomModal} ${values.NomModal}`
        
        // PDF Header
        doc.setFontSize(14);
        doc.text(NP, 10, 15);
        doc.text(values.MailModal, 10, 20);
        // doc.text(values.PostalModal, 10, 25);
        // doc.text(values.VilleModal, 10, 30);
        doc.text(values.currentOrganisme, 200, 45, null, null, "right");
        doc.text(values.MailorgaModal, 200, 50, null, null, "right");
        // doc.text(values.PostalorgaModal, 200, 55, null, null, "right");
        // doc.text(values.VilleorgaModal, 200, 60, null, null, "right");
        doc.setFont('Times-Roman', 'bold');

        // PDF Content
        this.getContent(pdf, doc, values);

        // PDF Footer
        doc.text(NP, 10, 240);
        doc.addImage("/img/ProtectID_logo.242c85be.png", "PNG", 145, 280, 60, 15);
        doc.save(`${pdf}.pdf`);
    },
    preview(pdf, values, target) {
        const doc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4',
            putOnlyUsedFonts:true, 
            userUnit: 1,
            precision: 2
        });

        const NP = `${values.PrenomModal} ${values.NomModal}`
        
        // PDF Header
        doc.text(NP, 10, 20);
        doc.text(values.MailModal, 10, 26);
        // doc.text(values.PostalModal, 10, 25);
        // doc.text(values.VilleModal, 10, 30);
        doc.text(values.MailorgaModal, 95, 36,{maxWidth:105});
        doc.text(values.currentOrganisme, 95, 42, {maxWidth:105});
        // doc.text(values.PostalorgaModal, 200, 55, null, null, "right");
        // doc.text(values.VilleorgaModal, 200, 60, null, null, "right");
        doc.setFont('Times-Roman', 'bold');

        // PDF Content
        this.getContent(pdf, doc, values);

        // PDF Footer
        doc.text(NP, 10, 250);
        doc.addImage("/img/ProtectID_logo.242c85be.png", "PNG", 140, 280, 60, 15);

        // Url du blob du pdf
        let url = doc.output('bloburl');

        let height = window.innerHeight * .99;
        // créer une instance de PdfView
        let view = new PdfView(url, target, {
            height: `${height}px`, 
            width: "auto",
            'min-width': '575px',
        });
        
        // Afficher la preview
        view.view();
    },
    previewMedical(values, target) {
        const doc = new jsPDF();
        const NP = `${values.Prenom10} ${values.Nom10}`
        console.log(target)
        
        // PDF Header
        doc.setFontSize(14);
        doc.text(NP, 10, 15);
        doc.text(values.Mail10, 10, 20);
        // doc.text(values.PostalModal, 10, 25);
        // doc.text(values.VilleModal, 10, 30);
        doc.text(values.currentOrganisme, 200, 45, null, null, "right");
        doc.text(values.Mailorga10, 200, 50, null, null, "right");
        // doc.text(values.PostalorgaModal, 200, 55, null, null, "right");
        // doc.text(values.VilleorgaModal, 200, 60, null, null, "right");
        doc.setFont('Times-Roman', 'bold');

        // PDF Content
        this.getContent('medical', doc, values);

        // PDF Footer
        doc.text(NP, 10, 240);
        doc.addImage("/img/ProtectID_logo.242c85be.png", "PNG", 145, 280, 60, 15);
        
        // Url du blob du pdf
        let url = doc.output('bloburl');

        // créer une instance de PdfView
        let view = new PdfView(url, target, {
            height: "calc(77vh + 190px)", 
            width: "auto",
            'min-width': '575px',
        });
        
        // Afficher la preview
        view.view();
    },
    // Get the good content for the pdf
    getContent(pdf, doc, values) {
        let maxWidth = {maxWidth: 190};
        switch (pdf) {
            case "acces": 
                doc.text('Objet: Droit d\'accès', 10, 60, maxWidth);
                doc.setFont('Times-Roman', 'normal')
                doc.text('Madame, Monsieur,', 10, 70, maxWidth);
                doc.text('Je vous prie de bien vouloir m\'indiquer si des données me concernant figurent dans vos fichiers informatisés ou manuels.', 10, 80, maxWidth);
                doc.text('Dans l\'affirmative, je souhaiterais obtenir une copie, en langage clair, de l\'ensemble de ces et données (y compris celles figurant dans les zones « blocs-notes » ou « commentaires ») en application de l\'article 15 du Règlement général sur la protection des données (RGPD).', 10, 100, maxWidth);
                doc.text('Je vous remercie de me faire parvenir votre réponse dans les meilleurs délais et au plus tard dans un délai d\'un mois à compter de la réception de ma demande (article 12.3 du RGPD).', 10, 130, maxWidth);
                doc.text('A défaut de réponse de votre part dans les délais impartis ou en cas de réponse incomplète je me réserve la possibilité de saisir la Commission nationale de l\'informatique et des libertés (CNIL) d\'une réclamation.', 10, 155, maxWidth);
                doc.text('A toutes fins utiles, vous trouverez des informations sur le site internet de la CNIL : ', 10, 178, maxWidth);
                doc.text('https://www.cnil.fr/fr/professionnels-comment-repondre-une-demande-de-droit-dacces.', 10, 184, maxWidth);
                doc.text('Je vous prie d\'agréer, Madame, Monsieur, l\'expression de mes salutations distinguées.', 10, 200, maxWidth);                
                break;

            case "compte":
                doc.text('Objet: Demande de clôture de compte et de suppression de données personnelles me concernant\n', 10, 60, maxWidth);
                doc.setFont('Times-Roman', 'normal');
                doc.text('Madame, Monsieur,\n', 10, 76);
                doc.text(`Je suis titulaire du compte ${values.Identifiant} sur ${values.Reseau_Social}, qui diffuse des informations me concernant à la page: ${values.Url}. \n`, 10, 84, maxWidth);
                doc.text('Je souhaite obtenir la clôture de mon compte et vous demande, en application de l’article 17.1 du Règlement général sur la protection des données (RGPD),  de supprimer l’ensemble de mes données personnelles qui lui sont rattachées, à savoir :\n', 10, 104, maxWidth);
                doc.text(values.Delete_Infos, 10, 130, maxWidth);
                doc.text('Je vous remercie de bien vouloir m\'informer des mesures prises à la suite de ma demande dans les meilleurs délais et au plus tard dans un délai d’un mois à compter de sa réception (article 12.3 du RGPD).\n', 10, 155, maxWidth);
                doc.text('Je vous prie d\'agréer, Madame, Monsieur, l\'expression de mes salutations distinguées.\n', 10, 180);
                break;

            case "financier":
                doc.text('Objet: Droit d\'accès\n', 10, 60);
                doc.text(`Ref: ${values.Identifiant}`,10, 68);
                doc.setFont('Times-Roman', 'normal');
                doc.text('Madame, Monsieur,\n', 10, 80);
                doc.text('Conformément à l’article en application de l’article 15 du Règlement général sur la protection des données (RGPD), je vous prie de bien vouloir m’indiquer si des informations me concernant figurent figurent dans vos fichiers informatisés ou manuels.\n', 10, 88, maxWidth);
                doc.text('Dans l’affirmative, je vous demande de me faire parvenir une copie, en langage clair, de l’ensemble,de ces données (y compris celles figurant dans les zones « blocs-notes » ou « commentaires »).\n', 10, 120, maxWidth);
                doc.text('Vous voudrez bien également me donner toute information disponible sur l’origine de ces données me concernant.\n', 10, 148, maxWidth);
                doc.text('Je vous remercie de me faire parvenir votre réponse dans les meilleurs délais et au plus tard dans un délai d’un mois à compter de la réception de ma demande (article 12.3 du RGPD).\n', 10, 165, maxWidth);
                doc.text('Je vous prie d’agréer, Madame, Monsieur, l’expression de mes salutations distinguées.\n', 10, 188, maxWidth);
                break;

            case "incompletes":
                doc.text('Objet: Rectification de données me concernant\n', 10, 60);
                doc.setFont('Times-Roman', 'normal');
                doc.text('Madame, Monsieur,\n', 10, 70)
                doc.text('Les données suivantes me concernant qui figurent dans vos fichiers sont incomplètes : \n', 10, 78);
                doc.text(values.Rectifier, 10, 85, maxWidth);
                doc.text('Par conséquent, en application de l’article 16 du Règlement général sur la protection des données (RGPD), je vous remercie de bien vouloir compléter votre fichier avec les données ci-dessous utiles à votre traitement : \n', 10, 115, maxWidth);
                doc.text(values.Rectifiees, 10, 135, maxWidth);
                doc.text('Vous voudrez bien me faire parvenir votre réponse dans les meilleurs délais et au plus tard dans un délai d\'un mois à compter de la réception de ma demande (article 12.3 du RGPD).\n', 10, 166, maxWidth);
                doc.text('Je vous remercie également de notifier cette demande de rectification aux organismes que vous auriez rendus destinataires de mes données (article 19 du RGPD).\n', 10, 190, maxWidth);
                doc.text('Je vous prie d\'agréer, Madame, Monsieur, l\'expression de mes salutations distinguées.', 10, 215);
                break;
                
            case "inexactes":
                doc.text('Objet: Rectification de données me concernant\n', 10, 60);
                doc.setFont('Times-Roman', 'normal');
                doc.text('Madame, Monsieur,\n', 10, 70)
                doc.text('Les données suivantes me concernant qui figurent dans vos fichiers sont inexactes : \n', 10, 78);
                doc.text(values.Rectifier, 10, 85, maxWidth);
                doc.text('Par conséquent, en application de l’article 16 du Règlement général sur la protection des données (RGPD), je vous remercie de bien vouloir compléter votre fichier avec les données ci-dessous utiles à votre traitement : \n', 10, 115, maxWidth);
                doc.text(values.Rectifiees, 10, 135, maxWidth);
                doc.text('Vous voudrez bien me faire parvenir votre réponse dans les meilleurs délais et au plus tard dans un délai d\'un mois à compter de la réception de ma demande (article 12.3 du RGPD).\n', 10, 166, maxWidth);
                doc.text('Je vous remercie également de notifier cette demande de rectification aux organismes que vous auriez rendus destinataires de mes données (article 19 du RGPD).\n', 10, 190, maxWidth);
                doc.text('Je vous prie d\'agréer, Madame, Monsieur, l\'expression de mes salutations distinguées.', 10, 215);
                break;

            case "medical":
                doc.text('Objet: Demande d’accès à mon dossier médical\n', 10, 60);
                doc.setFont('Times-Roman', 'normal');
                doc.text(`${values.Civilite10}, \n`, 10, 70);
                doc.text('En application des dispositions de l’article L. 1111-7 du code de la santé publique, je vous remercie de m’adresser l’ensemble des données que vous détenez sur ma santé, qu’elles soient soient sous forme papier ou sur support informatique (ainsi que la signification des codes, sigles ou abréviations éventuellement utilisés).\n', 10, 80, maxWidth);
                doc.text(values.informations_complementaires, 10, 110, maxWidth)
                doc.text('Vous trouverez en pièce jointe un justificatif de mon identité.\n', 10, 148);
                doc.text('Pour votre information, vous disposez d’un délai de huit jours pour satisfaire ma demande. Ce délai est porté à deux mois lorsque les informations médicales datent de plus de cinq ans.\n', 10, 160, maxWidth);
                doc.text('Je vous prie d’agréer, Monsieur,, l’expression de mes salutations distinguées.\n', 10, 176);
                doc.text('P.J :\n', 10, 188);
                doc.text('Copie de pièce d\'identité \n', 10, 195);
                break;
                
            case "prospection":
                doc.text('Objet: Opposition à l’utilisation commerciale de mes coordonnées\n', 10, 60)
                doc.setFont('Times-Roman', 'normal')
                doc.text(`ref: ${values.Identifiant}`,10, 70)
                doc.text('Madame, Monsieur,\n', 10, 80)
                doc.text('Je vous demande de noter que je m\'oppose à ce que mes coordonnées, figurant dans vos fichiers, soient utilisées à des fins de prospection, en application de l\'article 21.2 du Règlement général sur la protection des données (RGPD).\n', 10, 100, maxWidth)
                doc.text('Ainsi, je vous remercie de supprimer mes coordonnées de vos fichiers d\'envoi de prospection (article 17.1 du RGPD) et de notifier cette demande de suppression aux partenaires que vous auriez rendus destinataires de mes données (article 19 du RGPD).\n', 10, 128, maxWidth);
                doc.text('Je vous remercie de m\'informer des mesures prises à la suite de ma demande dans les meilleurs délais et au plus tard dans un délai d\'un mois à compter de sa réception (article 12.3 du RGPD).\n', 10, 158, maxWidth)
                doc.text('Je vous prie d\'agréer, Madame, Monsieur, l\'expression de mes salutations distinguées.', 10, 180)
                break;
                    
            case "pub":
                doc.text('Objet: Opposition à recevoir de la publicité\n', 10, 60)
                doc.setFont('Times-Roman', 'normal')
                doc.text('Madame, Monsieur,\n', 10, 70)
                doc.text('Conformément aux dispositions de l\'article 21.2 du RGPD, je vous remercie de bien vouloir supprimer mes coordonnées de vos fichiers d\'envoi de publicités.\n', 10, 80, maxWidth)
                doc.text('Je vous rappelle que vous disposez d\'un délai maximal d\'un mois suivant la réception de ce courrier pour répondre à ma demande, conformément à l\'article 12.3 du RGPD.\n', 10, 100, maxWidth)
                doc.text('Je vous prie d\'agréer, Madame, Monsieur, l\'expression de mes salutations distinguées.', 10, 128)
                break;
                
            case "site":      
                doc.text('Objet: Rectification de données me concernant\n', 10, 60);
                doc.setFont('Times-Roman', 'normal');
                doc.text('Madame, Monsieur,\n', 10, 70);
                doc.text('Des informations me concernant sont actuellement diffusées sur votre site internet sur les pages suivantes :\n', 10, 80, maxWidth);
                doc.text(values.Urls, 10, 92, maxWidth);
                doc.text('Aussi, en application des articles 21.1 et 17.1.c. du Règlement général sur la protection des données (RGPD), je vous remercie de supprimer les données personnelles suivantes me concernant :\n', 10, 120,maxWidth);
                doc.text(values.Info, 10, 138);
                doc.text('Je souhaite que ces informations soient supprimées car :\n', 10, 160);
                doc.text(values.Motif, 10, 166);
                doc.text('Je vous remercie également de faire le nécessaire pour que ces pages ne soient plus référencées par les moteurs de recherche (article 17.2 du RGPD).\n', 10, 192, maxWidth);
                doc.text('Vous voudrez bien me faire parvenir votre réponse dans les meilleurs délais et au plus tard dans un délai d\'un mois à compter de la réception de ma demande (article 12.3 du RGPD).\n', 10, 206, maxWidth)
                doc.text('Je vous prie d\'agréer, Madame, Monsieur, l\'expression de mes salutations distinguées.', 10, 228)
                break;

            case "supprime":      
                doc.text('Objet: Suppression de données personnelles \n', 10, 60);
                doc.setFont('Times-Roman', 'normal');
                doc.text('Madame, Monsieur,\n', 10, 70);
                doc.text('En application de l\'article 17.1 du Règlement général sur la protection des données, je vous prie d\'effacer de vos fichiers les données personnelles suivantes me concernant:\n', 10, 80, maxWidth)
                doc.text(values.Info, 10, 98, maxWidth);
                doc.text('Je demande que ces informations soient supprimées car :\n', 10, 126);
                doc.text(values.Motif, 10, 132, maxWidth);
                doc.text('Vous voudrez bien également notifier cette demande d\'effacement de mes données aux organismes auxquels vous les auriez communiquées (article 19 du RGPD).\n', 10, 160, maxWidth);
                doc.text('Enfin, je vous prie de m\'informer de ces éléments dans les meilleurs délais et au plus tard dans un délai d\'un mois à compter de la réception de ce courrier (article 12.3 du RGPD).\n', 10, 180, maxWidth);
                doc.text('A défaut de réponse de votre part dans les délais impartis ou en cas de réponse incomplète, je me réserve la possibilité de saisir la Commission nationale del\'informatique et des libertés (CNIL) d\'une réclamation.\n', 10, 202, maxWidth);
                doc.text('Je vous prie d\'agréer, Madame, Monsieur, l\'expression de mes salutations distinguées.', 10, 226);
                break;

            case "traitement":      
                doc.text('Objet: Droit d\'opposition \n', 10, 60);
                doc.setFont('Times-Roman', 'normal');
                doc.text('Madame, Monsieur,\n', 10, 70);
                doc.text('En application de l\'article 21.1 du Règlement général sur la protection des données (RGPD), je m\'oppose au traitement de mes données à caractère personnel par votre organisme car :\n', 10, 80, maxWidth);
                doc.text(values.Info, 10, 92, maxWidth);
                doc.text('Dès lors, vous voudrez bien :\n', 10, 130);
                doc.text('- supprimer mes données de vos fichiers et notifier ma demande aux organismes auxquels vous les auriez communiquées (articles 17.1.c. et 19 du RGPD) ;\n', 10, 136, maxWidth);
                doc.text('- si vous en avez l\'obligation légale, m\'indiquer la durée de conservation de mes données dans vos bases archives ;\n', 10, 148, maxWidth);
                doc.text('- m\'informer de ces éléments dans les meilleurs délais et au plus tard dans un délai d\'un mois à compter de la réception de ce courrier (article 12.3 du RGPD).\n', 10, 160, maxWidth);
                doc.text('À défaut de réponse de votre part dans les délais impartis ou en cas de réponse incomplète, je saisirai la Commission nationale de l\'informatique et des libertés (CNIL) d\'une réclamation\n', 10, 182, maxWidth);
                doc.text('Je vous prie d\'agréer, Madame, Monsieur, l\'expression de mes salutations distinguées.', 10, 210, maxWidth);
                break;

            case "video":    
                doc.text('Objet: Demande d\'accès à des images me concernant issues de votre dispositif de vidéosurveillance\n', 10, 60, maxWidth);
                doc.setFont('Times-Roman', 'normal');
                doc.text('Madame, Monsieur,\n', 10, 78);
                doc.text(`Je vous prie de bien vouloir m’indiquer si des images me concernant figurent dans votre dispositif de vidéosurveillance pour la date du  ${values.Date} de à ${values.Heure_fin}.\n`, 10, 90, maxWidth);
                doc.text('Dans l’affirmative, je vous demande de bien vouloir me donner l’accès à ces images, en application de l’article 15 du Règlement général sur la protection des données (RGPD).\n', 10, 108, maxWidth);
                doc.text('Je vous remercie de me faire parvenir votre réponse dans les meilleurs délais et au plus tard dans un délai d’un mois à compter de la réception de ma demande (article 12.3 du RGPD).\n', 10, 136, maxWidth);
                doc.text('A toutes fins utiles, vous trouverez des informations sur le site internet de la CNIL :\n', 10, 162)
                doc.text('https://www.cnil.fr/modele/courrier/acceder-des-images-video-vous-concernant\n', 10, 168)
                doc.text('Je vous prie d\'agréer, Madame, Monsieur, l\'expression de mes salutations distinguées.', 10, 180)
                break;
            }
    },
}