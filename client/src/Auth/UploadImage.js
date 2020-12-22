import React, { useRef, useState, useEffect } from "react";
import defaultImage from "../assets/img/user-solid.svg";
import Button from "../FormElements/Button";

import "./UploadImage.style.css";

const UploadImage = (props) => {
	const [file, setFile] = useState();
	const [previewUrl, setPreviewUrl] = useState();
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	const pickImageRef = useRef();

	useEffect(() => {
		if (!file) {
			return;
		}

		const fileReader = new FileReader();
		fileReader.onload = () => {
			setPreviewUrl(fileReader.result);
		};
		fileReader.readAsDataURL(file);
	}, [file]);

	const pickImageHandler = (event) => {
		let pickFile;
		if (event.target.files && event.target.files.length === 1) {
			pickFile = event.target.files[0];
			setFile(pickFile);
			console.log(file);
		}
		props.onInput(pickFile);
	};

	useEffect(() => {
		window.addEventListener("resize", () => {
			setWindowWidth(window.innerWidth);
		});
	}, [setWindowWidth]);

	const pickImage = () => {
		console.log(pickImageRef);
		pickImageRef.current.click();
	};

	return (
		<div className="upload-image-control">
			<input
				type="file"
				id={props.id}
				name="image"
				style={{ display: "none" }}
				accept=".jpg,.png,jpeg"
				ref={pickImageRef}
				onChange={pickImageHandler}
			/>
			<div className="image-upload" onDoubleClick={pickImage}>
				{windowWidth >= 750 ? (
					<div className="image-upload--preview">
						{previewUrl && <img src={previewUrl} alt="preview" />}
						{!previewUrl && (
							<div className="image-upload-default">
								<React.Fragment>
									<img src={defaultImage} alt="default" className="default-image-profile" />
									<p>Double click to pick image</p>
								</React.Fragment>
							</div>
						)}
					</div>
				) : (
					<div className="uploade-image--button">
						<Button upload type="button" onClick={pickImage}>
							<i class="fas fa-portrait"></i>
							Pick Image
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};
export default UploadImage;
