// return a json object from a local file
function load_json(filename) {
	let req = new XMLHttpRequest();
	req.overrideMimeType("application/json");
	req.open("GET", filename, false);
	req.send();
	if(req.status == 200) return JSON.parse(req.responseText);
	else return null;
}
function keysrt(a,b) {
   if (a[0] > b[0]) return -1;
   if (a[0] < b[0]) return 1;
   return 0;
}
function get_commits(jsons) {
	commits_arr = [];
	for(j of jsons) {
		for(c in j) {
			if(commits_arr.indexOf(c) == -1) commits_arr.push([j[c].date,c]);
		}
	}
    commits_arr.sort(keysrt);
    answer = [commits_arr[0]];
    for (var i = 1; i < commits_arr.length; i++) {
      if(commits_arr[i][1] != answer[answer.length - 1][1]) {
        answer.push(commits_arr[i]);
      }
    }
	return answer;
}

function date_data_array(jsons) {
	
}
function commit_data_array_date(jsons, benchnames) {
	var arr = [["Commit"]];
	for(bn of benchnames) {
		arr[0].push(bn);
	}
    arr[0].push("Date");
	for(cd of get_commits(jsons)) {
        c = cd[1];
		row = [c];
		for(let i = 0; i < jsons.length; i++) {
			if(jsons[i][c].speed != null) row[i + 1] = jsons[i][c].speed;
			else row[i + 1] = 0;
		}
        row.push(cd[0]);
		arr.push(row);
	}

	return arr;
}

function commit_data_array(jsons, benchnames) {
	var arr = [["Commit"]];
	for(bn of benchnames) {
		arr[0].push(bn);
	}
	for(cd of get_commits(jsons)) {
        c = cd[1];
		row = [c];
		for(let i = 0; i < jsons.length; i++) {
			if(jsons[i][c].speed != null) row[i + 1] = jsons[i][c].speed;
			else row[i + 1] = 0;
		}
		arr.push(row);
	}

	return arr;
}

