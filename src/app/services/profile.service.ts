import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from '../interfaces/profile.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  api = 'http://localhost:3000/profiles/';

  constructor(private http: HttpClient){}

  buscarTodos(): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.api);
  }

  buscarPorId(profileId: string): Observable<Profile> {
    return this.http.get<Profile>(`${this.api}${profileId}`);
  }

  criarProfile(newProfile: Profile): Observable<Profile> {
    return this.http.post<Profile>(this.api, newProfile);
  }

  atualizarProfile(updateProfile: Profile): Observable<Profile> {
    return this.http.put<Profile>(`${this.api}${updateProfile.id}`, updateProfile);
  }

  deletarProfile(profileId: string): Observable<Profile> {
    return this.http.delete<Profile>(`${this.api}${profileId}`);
  }
}
