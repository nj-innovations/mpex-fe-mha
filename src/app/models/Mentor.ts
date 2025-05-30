import { IgetMentorProjects, IgetMentorsSector } from "../home/requests/IgetMentorsResponse";

export class Mentor {
	'selectedProfile': string;

	constructor(
		public fname: string,
		public lname: string,
		public guid: string,
		public organization: string,
		public title: string[],
		public degree: string[],
		public open_to_precepting: string,
		public avatar: string,
		public projects: IgetMentorProjects[],
		public linkedin: string,
		public state: string,
		public city: string,
		public sectors: IgetMentorsSector[]
	){
		this.selectedProfile = 'Y';
	}
}