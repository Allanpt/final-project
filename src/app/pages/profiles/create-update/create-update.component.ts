import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from 'src/app/interfaces/profile.type';
import { ProfileService } from 'src/app/services/profile.service';
import { createUpdateValidationInit } from 'src/app/utils/createUpdateValidationInit';
import { GenerateID } from 'src/app/utils/generateID';
import { CompareProfilesChange, ValidateInputs } from 'src/app/utils/validates';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.css'],
})
export class CreateUpdateComponent {

  profile: Profile = {
    name: '',
    id: '',
    role: '',
    age: NaN,
    email: '',
    isActive: false,
    country: '',
    experience: '',
  };

  oldProfile: Profile = {
    id: '',
    name: '',
    role: '',
    age: 0,
    email: ''
  };


  isEdit: boolean = false;
  isProfileUnchanged: boolean = true;

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    createUpdateValidationInit();
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.getProfileById(id);
      }
    });
  }


  createProfile(newProfile: Profile) {
    return this.profileService
      .criarProfile(newProfile)
      .subscribe((createdProfile: Profile) => {
        Swal.fire({
          icon: "success",
          title: "Pessoa criada com sucesso!",
          showConfirmButton: true,
          timer: 3000
        }).then(() => {
          this.router.navigate(['/profile']);
        });
      });
  }
  getProfileById(profileId: string) {
    return this.profileService
      .buscarPorId(profileId)
      .subscribe((res: Profile) => {
        this.profile = res;
        this.oldProfile = {...res};
        this.isProfileUnchanged = true;
      });
  }

  editProfile(updateProfile: Profile) {
    return this.profileService
      .atualizarProfile(updateProfile)
      .subscribe((updated: Profile) => {
        this.profile = updated;
      });
  }

  onProfileChange() {
    this.isProfileUnchanged = CompareProfilesChange(this.oldProfile, this.profile);
  }

  onSubmit() {

    if(!ValidateInputs(this.profile)) {
      return;
    }

    if (!this.isProfileUnchanged && this.isEdit) {
      Swal.fire({
        title: "Você quer realmente atualizar?",
        showDenyButton: true,
        confirmButtonText: "Sim",
        denyButtonText: `Não`
      }).then((result) => {
        if (result.isConfirmed) {
          this.editProfile(this.profile);
          Swal.fire("Atualizado!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Operação cancelada", "", "error");
        }

        this.router.navigate(['/profile']);
      });
      return;
    }

    this.profile.id = GenerateID();
    this.createProfile(this.profile);
  }
}
