import { Component, Input } from '@angular/core';
import { Profile } from 'src/app/interfaces/profile.type';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css'],
})
export class ProfileListComponent {

  @Input() profiles: Profile[] = [];
  keys: string[] = [];

  constructor(private profileService: ProfileService) {}


  ngOnInit() {
    return this.profileService.buscarTodos().subscribe((res: Profile[]) => {
      this.profiles = res.map((el) => ({
        ...el,
        email: el.email || 'REQUIRED',
        name: el.name || 'REQUIRED',
        role: el.role || 'REQUIRED',
        isActive: el.isActive || false,
      }));

      this.keys = res
        .map((el) => Object.keys(el))
        .sort()
        [res.length - 1].map((el) => el.charAt(0).toUpperCase() + el.slice(1))
        .map((el) => (el === 'Id' ? '#' : el))
        .map((el) => (el === 'IsActive' ? 'Active' : el));
    });
  }

  deleteProfile(profileId: string) {
    const nameProfile = this.profiles.find(el => el.id === profileId)?.name

    Swal.fire({
      title: `Você quer deletar ${nameProfile}?`,
      text: 'Não será possível reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SIM, eu quero deletar!',
    }).then((result) => {
      if (result.isConfirmed) {

        this.profileService.deletarProfile(profileId).subscribe(() => {
          this.profiles = this.profiles.filter((el) => el.id !== profileId);
        });

        Swal.fire({
          title: 'Deletado!',
          text: `O usuário ${nameProfile} foi deletado com sucesso.`,
          icon: 'success',
        });
      }
    });
  }
}
