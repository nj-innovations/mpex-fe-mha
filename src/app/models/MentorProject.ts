export class MentorProject {
	constructor(
		public id: string,
		public user_id: number,
		public project: string,
		public updated_at: string,
		public user_fname: string,
		public user_lname: string,
		public organization: string,
		public user_guid: string,
		public user_title: string[],
		public user_degree: string[]
	){
	}
}