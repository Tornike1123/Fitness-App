import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import Detail from "../components/Details";
import ExerciseVideos from "../components/ExerciseVideos";
import SimilarExercise from "../components/SimilarExercise";
import {
	exercisesOptions,
	fetchData,
	youtubeOptions,
} from "../utils/fetchData";

const ExerciseDetail = () => {
	const [exerciseDetail, setExerciseDetail] = useState({});
	const [exerciseVideos, setExerciseVideos] = useState([]);
	const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
	const [equipmentExercises, setEquipmentExercises] = useState([]);

	const { id } = useParams();

	useEffect(() => {
		const fetchExercisesData = async () => {
			const exerciseDbUrl = "https://exercisedb.p.rapidapi.com";
			const youtubeSearchUrl =
				"https://youtube-search-and-download.p.rapidapi.com";
			const exerciseDetailData = await fetchData(
				`${exerciseDbUrl}/exercises/exercise/${id}`,
				exercisesOptions
			);
			setExerciseDetail(exerciseDetailData);

			const exerciseVideoData = await fetchData(
				`${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`,
				youtubeOptions
			);
			setExerciseVideos(exerciseVideoData.contents);

			const targetMuscleExercisesData = await fetchData(
				`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`,
				exercisesOptions
			);
			setTargetMuscleExercises(targetMuscleExercisesData);

			const equipmentExercisesData = await fetchData(
				`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`,
				exercisesOptions
			);
			setEquipmentExercises(equipmentExercisesData);
		};
		fetchExercisesData();
	}, [id]);

	return (
		<Box>
			<Detail exerciseDetail={exerciseDetail} />
			<ExerciseVideos
				exerciseVideos={exerciseVideos}
				name={exerciseDetail.name}
			/>
			<SimilarExercise
				targetMuscleExercises={targetMuscleExercises}
				equipmentExercises={equipmentExercises}
			/>
		</Box>
	);
};

export default ExerciseDetail;
