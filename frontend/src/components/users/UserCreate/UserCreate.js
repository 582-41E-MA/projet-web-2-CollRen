import { Input } from '../../Input'
import Bouton from '../../partialsFormulaire/Bouton/Bouton';
import { FormProvider, useForm } from 'react-hook-form'
import { useState } from 'react'
import { BsFillCheckSquareFill } from 'react-icons/bs'
import './UserCreate.css';  // Assurez-vous d'importer le CSS

function UserCreate({ t }) {

    const methods = useForm()
    const [success, setSuccess] = useState(false)

    const [privilegeId, setPrivilegeId] = useState('3');
    const [error, setError] = useState('');

    let prenom, nom, courriel, mdp, nomUtilisateur

    const onSubmit = methods.handleSubmit(data => {
        console.log(data)
        prenom = data.prenom
        nom = data.nom
        courriel = data.courriel
        mdp = data.mdp
        nomUtilisateur = data.nomUtilisateur

        console.log(prenom)

        const newUser = {
            prenom: prenom,
            nom: nom,
            courriel: courriel,
            nom_utilisateur: nomUtilisateur,
            mot_de_passe: mdp,
            privilege_id: privilegeId
        };

        fetch(`${t("fetch")}utilisateurs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                setPrivilegeId('3');
                setError('');
            })
            .catch((error) => {
                console.error('Error:', error);
                setError('Some error occurred while creating the user.');
            });

        methods.reset()

        setSuccess(true)
    })

    let test = `${t("CreateUser.prenom")}`
    const first_name_validation = {
        name: 'prenom',
        label: t("CreateUser.prenom"),
        type: 'text',
        id: 'name',
        placeholder: t("CreateUser.prenomPlaceHolder"),
        validation: {
            required: {
                value: true,
                message: t("form.requis"),
            },
            maxLength: {
                value: 30,
                message: `30 ${t("form.maxcaractere")}`,
            },
        }
    }

    const name_validation = {
        name: 'nom',
        label: t("CreateUser.nom"),
        type: 'text',
        id: 'name',
        placeholder: t("CreateUser.nomPlaceHolder"),
        validation: {
            required: {
                value: true,
                message: t("form.requis"),
            },
            maxLength: {
                value: 30,
                message: `30 ${t("form.maxcaractere")}`,
            },
        }
    }

    const nom_utilisateur_validation = {
        name: 'nomUtilisateur',
        label: t("CreateUser.nomUtilisateur"),
        type: 'text',
        id: 'name',
        placeholder: t("CreateUser.nomUtilisateurPlaceHolder"),
        validation: {
            required: {
                value: true,
                message: t("form.requis"),
            },
            maxLength: {
                value: 30,
                message: `30 ${t("form.maxcaractere")}`,
            },
        }
    }

    const password_validation = {
        name: 'mdp',
        label: t("CreateUser.mdp"),
        type: 'password',
        id: 'password',
        placeholder: `${t("CreateUser.mdpPlaceHolder")}...`,
        validation: {
            required: {
                value: true,
                message: t("form.requis"),
            },
            minLength: {
                value: 6,
                message: `6 ${t("form.mincaractere")}`,
            },
        },
    }

    const num_validation = {
        name: 'num',
        label: 'number',
        type: 'number',
        id: 'num',
        placeholder: 'write a random number',
        validation: {
            required: {
                value: true,
                message: t("form.requis"),
            },
        },
    }

    const email_validation = {
        name: 'courriel',
        label: t("CreateUser.courriel"),
        type: 'text',
        id: 'name',
        placeholder: t("CreateUser.courrielPlaceHolder"),
        validation: {
            required: {
                value: true,
                message: t("form.requis"),
            },
            maxLength: {
                value: 30,
                message: `30 ${t("form.maxcaractere")}`,
            },
            pattern: {
                value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: t("form.invalide"),
            },
        },
    }


    return (
        <main className="main-background ">
            <div className="form-container ">
                <h1 className="text-4xl  font-titre font-bold">{t("CreateUser.soustitre")}</h1>
                <div className='rounded-2xl'>
                    <FormProvider {...methods}>
                        <form
                            onSubmit={e => e.preventDefault()}
                            noValidate
                            autoComplete="off"
                            className='my-4 p-4 rounded-2xl'
                        >

                            <Input {...first_name_validation} />
                            <Input {...name_validation} />
                            <Input {...email_validation} />
                            <Input {...nom_utilisateur_validation} />
                            <Input {...password_validation} />

                            <div className="mt-5">
                                {success && (
                                    <p className="font-semibold text-green-500 mb-5 flex items-center gap-1">
                                        <BsFillCheckSquareFill /> {t("form.envoyes.succes")}
                                    </p>
                                )}

                                <div onClick={onSubmit}>

                                    <Bouton type="submit">{t("CreateUser.btnSubmit")} </Bouton>
                                </div>

                            </div>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </main>
    )
}

export default UserCreate;