package kr.codesquad.issuetracker.presentation.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class LabelResponse {

	private Integer labelId;
	private String labelName;
	private String fontColor;
	private String backgroundColor;
}
